# Fragg Force by Waqas Shah Perfume &bull; Private Sillage Atelier

Fragg Force is a modern, high-end luxury perfume e-commerce web application meticulously designed for **Waqas Shah Perfume**, established in Karachi, Pakistan. This platform delivers a bespoke, responsive shopping experience paired with advanced order trackers, a custom interactive sillage client review engine, automated invoice generator, and dedicated administrator control desks.

---

## 🎨 Visual Architecture & Design Principles

Designed for maximum aesthetic contrast and Dior-inspired sophistication, the platform follows several premium UI/UX parameters:
- **Cosmic Slate Theme**: Dark-mode paired with gorgeous gold (`#f59e0b` amber) outlines, geometric framing, and micro-interactions.
- **Aesthetic Typography**: Styled using custom Google fonts paired beautifully across Inter headers and JetBrains Mono status tables.
- **Fluid Layout**: Full responsive compatibility supporting smartphones up to ultra-wide desktop monitors without content stretching.
- **Purposeful Motion**: Leverages `motion/react` for elegant page entry animations and modal transitions.

---

## 🧭 Page Architecture & Verified Features

The website separates its responsibilities across nine highly tailored client routes:
1. **Landing/Home**: Includes heroic brand storytelling elements, bestsellers grids, organic trust benchmarks, private membership Allocations, and member subscription forms.
2. **Shop Catalog**: Implements real-time keyword filtering, structural gender-specific collection categories (Maison Unisex, Femme, Homme), and detailed product price currency conversion (USD, EUR, GBP).
3. **Product Details**: Displays deep ingredient analysis, application ritual protocols, custom size option selections, and a secure review/appraisal system.
4. **Member Dashboard**: Features client-side avatar management, persistent wishlist items, historical active orders tracking, and a secure member session simulator.
5. **Interactive Cart**: Handles complex multi-item calculation schemas, unit quantities adjustments, and customizable checkout pre-orders.
6. **Polished Checkout**: Connects payment methods (Atelier Billing Gateway, Direct COD, WhatsApp Invoice), coupon discounts code multipliers, and instant verification receipts.
7. **Order Tracking**: Queries and traces shipping batches, live dispatch dates, and transport coordinates with beautiful step indicators.
8. **Contact & Location**: Embeds specialized geographic iFrame coordinates mapping Karachi, Pakistan alongside pre-filled support email & WhatsApp links.
9. **Atelier Admin Panel**: A secure administrator backend with credentials validation for stock/inventory management, direct order updates, and analytics counters.

---

## 🗄️ Storage & Data Persistence Strategy

To ensure zero missing data and maintain robust, high-performance offline capacity without high-latency cold starts, the application uses:
1. **StoreContext React Core**: Coordinates active items, cart indices, product query filters, and active current currencies dynamically.
2. **Segmented LocalStorage Engine**: Reviews, wishlist state, and order tracking models are safely saved to standard client-side storage keys to persist user states natively across reload loops.
3. **Database Migration Standard**: Designed to quickly bind to durable cloud engines (e.g. Google Firebase Firestore) by mapping schemas directly through `/src/types.ts`.

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the project's root folder. Reference the variables listed below:

```env
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_KEY"

# APP_URL: The URL where this applet is hosted on Cloud Run.
APP_URL="https://your-domain-name.com"

# Administrator Credentials Workspace
ADMIN_1_NAME="Waqas Shah"
ADMIN_1_USERNAME="waqasshah"
ADMIN_1_PASSWORD="Waqashah101"

ADMIN_2_NAME="Zayyan Sheikh"
ADMIN_2_USERNAME="zayyansheikh"
ADMIN_2_PASSWORD="Zayyansheikh201"
```

---

## 🚀 Running the Project Locally

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
The development script is configured to automatically serve the client code with responsive Hot Module Reload.
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 3. Build & Production Compilation
A single, production-grade automated bundler script will assemble client-side bundles under `/dist`.
```bash
npm run build
```

---

## ☁️ Deployment Instructions

### Deploying to Google Cloud Run (Recommended Container Setup)

Because the dev-server runs as a lightweight Node application behind a port-3000 reverse-proxy, you can deploy it directly via Docker:

1. **Write Container Blueprint (Dockerfile)**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Publish to Google Artifact Registry**:
   ```bash
   gcloud builds submit --tag gcr.io/your-project-id/fragg-force-web
   ```

3. **Deploy Container Directly to Cloud Run**:
   ```bash
   gcloud run deploy fragg-force-web \
     --image gcr.io/your-project-id/fragg-force-web \
     --platform managed \
     --port 3000 \
     --allow-unauthenticated
   ```

---

## 👩‍💻 Development Contributions & Credits

- **Principal Founder**: **Waqas Shah** (Karachi, Pakistan)
- **Lead Full-Stack Developer**: **Zayyan Sheikh**
- **Creative & UI/UX Director**: **Dev Hub Team**
