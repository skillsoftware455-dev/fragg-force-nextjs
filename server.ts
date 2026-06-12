import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory sessions store to track active admin tokens
const activeSessions = new Map<string, { username: string; name: string; expiry: number }>();

// Read credentials from env, or default to required values if not set
const ADMIN_1_NAME = process.env.ADMIN_1_NAME || "Waqas Shah";
const ADMIN_1_USERNAME = (process.env.ADMIN_1_USERNAME || "waqasshah").toLowerCase().trim();
const ADMIN_1_PASSWORD = process.env.ADMIN_1_PASSWORD || "Waqashah101";

const ADMIN_2_NAME = process.env.ADMIN_2_NAME || "Zayyan Sheikh";
const ADMIN_2_USERNAME = (process.env.ADMIN_2_USERNAME || "zayyansheikh").toLowerCase().trim();
const ADMIN_2_PASSWORD = process.env.ADMIN_2_PASSWORD || "Zayyansheikh201";

interface SecureAdmin {
  name: string;
  username: string;
  salt: string;
  hash: string;
}

const secureAdmins: SecureAdmin[] = [];

function initSecureAdmins() {
  const pSource = [
    { name: ADMIN_1_NAME, username: ADMIN_1_USERNAME, password: ADMIN_1_PASSWORD },
    { name: ADMIN_2_NAME, username: ADMIN_2_USERNAME, password: ADMIN_2_PASSWORD }
  ];

  for (const item of pSource) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(item.password, salt, 1000, 64, 'sha512').toString('hex');
    secureAdmins.push({
      name: item.name,
      username: item.username,
      salt,
      hash
    });
  }
  
  console.log('Secure admin credentials initialized with PBKDF2-SHA512 hashing.');
}

initSecureAdmins();

// Verify a login attempt
function verifyAdminCredentials(username: string, rawPassword: string): { name: string; username: string } | null {
  const normalizedUsername = username.toLowerCase().trim();
  const foundAdmin = secureAdmins.find(a => a.username === normalizedUsername);
  if (!foundAdmin) return null;

  const hashAttempt = crypto.pbkdf2Sync(rawPassword, foundAdmin.salt, 1000, 64, 'sha512').toString('hex');
  if (crypto.timingSafeEqual(Buffer.from(foundAdmin.hash, 'hex'), Buffer.from(hashAttempt, 'hex'))) {
    return { name: foundAdmin.name, username: foundAdmin.username };
  }
  return null;
}

// 1. API: Authentication endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const verifiedAdmin = verifyAdminCredentials(username, password);
  if (!verifiedAdmin) {
    return res.status(401).json({ error: 'Access Denied: Invalid administrator credentials.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + 30 * 60 * 1000; // 30 minutes session

  activeSessions.set(token, {
    username: verifiedAdmin.username,
    name: verifiedAdmin.name,
    expiry
  });

  res.json({
    success: true,
    token,
    admin: verifiedAdmin
  });
});

// 2. API: Verify Session endpoint
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.substring(7);
  const session = activeSessions.get(token);

  if (!session || session.expiry < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.json({ authenticated: false });
  }

  session.expiry = Date.now() + 30 * 60 * 1000; // Extend duration
  res.json({
    authenticated: true,
    admin: {
      username: session.username,
      name: session.name
    }
  });
});

// 3. API: Logout endpoint
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// Serve frontend with Vite in Development, static files in Production
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
