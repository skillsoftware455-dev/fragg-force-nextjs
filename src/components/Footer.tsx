import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  Download, 
  FileText, 
  X, 
  Award, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, orders } = useStore();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceOrderNum, setInvoiceOrderNum] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const handleShopRedirect = (category: string) => {
    setSelectedCategory(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageRedirect = (page: 'landing' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'dashboard' | 'admin' | 'tracking' | 'contact') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInvoiceDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceOrderNum.trim()) {
      setDownloadError('Please specify a valid invoice or order code code.');
      return;
    }
    
    setDownloadError('');
    setDownloadSuccess(true);
    
    // Simulate generation and trigger a browser print/iframe download of a custom-styled premium receipt
    setTimeout(() => {
      // Create a hidden iframe for print operation
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice - ${invoiceOrderNum.toUpperCase()}</title>
              <style>
                body { font-family: 'Georgia', serif; padding: 40px; color: #111; background: #fff; }
                .border-gold { border: 2px solid #d97706; padding: 30px; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; }
                .logo { font-size: 28px; letter-spacing: 5px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
                .brand { color: #d97706; font-style: italic; }
                .subtitle { font-size: 10px; font-family: monospace; text-transform: uppercase; color: #666; letter-spacing: 3px; }
                .details { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px; }
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 12px; }
                .items-table th { border-bottom: 2px solid #111; text-align: left; padding: 10px 0; font-family: monospace; text-transform: uppercase; font-size: 10px; }
                .items-table td { border-bottom: 1px solid #eaeaea; padding: 15px 0; }
                .total { text-align: right; font-size: 16px; font-weight: bold; border-top: 2px solid #111; padding-top: 15px; }
                .footer-stamp { text-align: center; margin-top: 60px; font-size: 10px; color: #888; font-family: monospace; letter-spacing: 1px; }
              </style>
            </head>
            <body>
              <div class="border-gold">
                <div class="header">
                  <div class="logo">FRAGG <span class="brand">FORCE</span></div>
                  <div class="subtitle">Waqas Shah Perfume &bull; Established Member Couture</div>
                  <p style="font-size: 12px; margin-top: 5px; color: #666;">Karachi, Pakistan &bull; digitalnova516@gmail.com</p>
                </div>
                <div class="details">
                  <div>
                    <strong>INVOICE TO:</strong><br>
                    Valued Couture Patron<br>
                    Global Delivery Address
                  </div>
                  <div style="text-align: right;">
                    <strong>INVOICE CODE:</strong> INV-${invoiceOrderNum.toUpperCase()}<br>
                    <strong>DATE:</strong> ${new Date().toLocaleDateString()}<br>
                    <strong>STATUS:</strong> Paid &amp; Dispatched Verified
                  </div>
                </div>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Essence Description</th>
                      <th>Size</th>
                      <th style="text-align: right;">Qty</th>
                      <th style="text-align: right;">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Private Collection Selection - Waqas Shah Signature Sillage</td>
                      <td>100 ml</td>
                      <td style="text-align: right;">1</td>
                      <td style="text-align: right;">$280.00</td>
                    </tr>
                    <tr>
                      <td>Atelier Custom Satin Ribbon & Gift Box wrapping</td>
                      <td>Standard</td>
                      <td style="text-align: right;">1</td>
                      <td style="text-align: right;">Complimentary</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total">
                  TOTAL: $280.00 (Processed via Secure Atelier Gateway)
                </div>
                <div class="footer-stamp font-mono">
                  THANK YOU FOR CHOOSING THE COUTURE SILLAGE EXPERIMENT<br>
                  © 2026 FRAGG FORCE. ALL RIGHTS RESERVED.
                </div>
              </div>
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }, 600);
  };

  const mapLink = "https://maps.app.goo.gl/3MeQJXf7FiRrtY2Q8";

  return (
    <footer className="w-full bg-neutral-950 text-neutral-200 pt-16 pb-12 border-t border-neutral-900 transition-colors" id="maison-footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Header Mark & Detailed Heritage */}
          <div className="space-y-4">
            <div 
              onClick={() => handlePageRedirect('landing')}
              className="cursor-pointer space-y-1 group"
            >
              <div className="text-lg font-serif tracking-[0.3em] font-black uppercase text-white group-hover:text-amber-500 transition-colors">
                FRAGG <span className="text-amber-500 font-extrabold italic">FORCE</span>
              </div>
              
              <div className="text-[10px] tracking-[0.1em] text-neutral-400 capitalize hover:text-amber-500 transition-colors">
                Waqas Shah Perfume
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
              Designing exceptional sensory sanctuaries. We craft highly specialized modern artistic essences that reflect deep individuality, timeless elegance, and Dior-inspired absolute performance.
            </p>

            {/* Established Member Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 border border-amber-500/20 rounded text-[9px] font-mono tracking-wider text-amber-500 font-bold uppercase">
              <Award size={10} className="text-amber-500 animate-pulse" />
              <span>ESTABLISHED MEMBER COUTURE</span>
            </div>
          </div>

          {/* Column 2: Quick Links (Home, Shop, About, Contact, Tracking) */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-500 font-black font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans font-light">
              <li>
                <button 
                  onClick={() => handlePageRedirect('landing')} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span className="w-1 h-1 bg-amber-500/30 rounded-full"></span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleShopRedirect('All')} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span className="w-1 h-1 bg-amber-500/30 rounded-full"></span>
                  <span>Shop Collection</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handlePageRedirect('landing');
                    setTimeout(() => {
                      const el = document.getElementById('story-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  }} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span className="w-1 h-1 bg-amber-500/30 rounded-full"></span>
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageRedirect('contact')} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span className="w-1 h-1 bg-amber-500/30 rounded-full"></span>
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageRedirect('tracking')} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-1 cursor-pointer font-medium text-neutral-300"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                  <span>Order Tracking</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support (Email, WhatsApp, Tracking, Invoice Download) */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-500 font-black font-mono">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans font-light">
              <li>
                <a 
                  href="mailto:digitalnova516@gmail.com" 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-2"
                >
                  <Mail size={12} className="text-neutral-500" />
                  <span>Email Support</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/923233260083" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors flex items-center space-x-2"
                >
                  <MessageSquare size={12} className="text-emerald-500" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => handlePageRedirect('tracking')} 
                  className="hover:text-amber-500 transition-colors flex items-center space-x-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Order Tracking Status</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setDownloadSuccess(false);
                    setDownloadError('');
                    setInvoiceOrderNum('');
                    setShowInvoiceModal(true);
                  }} 
                  className="hover:text-amber-500 text-amber-500/90 transition-colors flex items-center space-x-2 font-medium cursor-pointer"
                >
                  <Download size={12} />
                  <span>Invoice Download</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Geographic Heritage information */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-500 font-black font-mono">
              Boutique Location
            </h4>
            
            <ul className="space-y-3 text-xs text-neutral-400 font-sans font-light">
              <li className="flex items-start space-x-2">
                <MapPin size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Karachi, Pakistan</span>
                  <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-amber-500 hover:underline flex items-center space-x-1 mt-1 font-mono"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2 border-t border-neutral-900 pt-2.5">
                <Mail size={12} className="text-amber-500" />
                <a href="mailto:digitalnova516@gmail.com" className="hover:text-amber-500 transition-colors text-white font-mono break-all">
                  digitalnova516@gmail.com
                </a>
              </li>
            </ul>

          </div>

        </div>

        {/* Footer bottom credit bar exactly mirroring requirements */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-400 tracking-[0.05em] uppercase font-sans">
          
          <p className="mb-4 md:mb-0 text-center md:text-left leading-relaxed">
             © 2026 Fragg Force by Waqas Shah Perfume. All Rights Reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center sm:text-right text-neutral-500">
            <span>Developed by <strong className="text-neutral-350">Zayyan Sheikh</strong></span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Designed by <strong className="text-amber-500">Dev Hub</strong></span>
          </div>

        </div>

      </div>

      {/* Luxury simulated invoice download drawer dialogue */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl relative space-y-5">
            
            <button 
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-amber-500 font-mono text-[10px] tracking-widest uppercase">
                <FileText size={12} />
                <span>Maison Gateway</span>
              </div>
              <h3 className="font-serif text-lg font-black text-white">Download Secure Invoice</h3>
              <p className="text-xs text-neutral-400">Request printed invoice copies for your fragrance files or tax ledger.</p>
            </div>

            {downloadSuccess ? (
              <div className="space-y-4 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-center">
                <div className="w-10 h-10 bg-emerald-500 text-neutral-955 rounded-full flex items-center justify-center mx-auto">
                  <Check size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Invoice Generated Successfully!</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">Luxe print preview dialogue should load on your screen momentarily.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDownloadSuccess(false)}
                  className="px-3 py-1.5 bg-neutral-800 text-[10px] text-neutral-200 hover:text-white rounded hover:bg-neutral-700 transition"
                >
                  Download Another Code
                </button>
              </div>
            ) : (
              <form onSubmit={handleInvoiceDownload} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="invoice-code-field" className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                    Order Code or Invoice ID
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="invoice-code-field"
                      placeholder="e.g. ORD-98410 or FF-781" 
                      value={invoiceOrderNum}
                      onChange={(e) => setInvoiceOrderNum(e.target.value)}
                      className="w-full text-xs p-3 pr-10 bg-black border border-neutral-800 rounded text-white focus:outline-none focus:border-amber-500 uppercase font-mono tracking-wider"
                      required
                    />
                    <FileText size={14} className="absolute right-3 top-3.5 text-neutral-500" />
                  </div>
                  {downloadError && (
                    <p className="text-[10px] text-rose-500 font-mono">{downloadError}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full p-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-mono font-black uppercase tracking-wider transition rounded flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Produce Invoice Document</span>
                  <ArrowRight size={12} />
                </button>
              </form>
            )}

            <div className="text-[9px] text-neutral-500 font-mono leading-relaxed text-center">
              All transactions are encrypted under secure sillage verification systems.
            </div>

          </div>
        </div>
      )}

    </footer>
  );
};
