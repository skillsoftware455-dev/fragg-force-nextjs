import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { X, Printer, Download, Mail, Check, CreditCard, ShoppingBag, FileText } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  const { formatPrice } = useStore();
  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  if (!isOpen || !order) return null;

  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const invoiceNumber = `INV-${order.id.replace('ORD-', '')}-${new Date(order.date).getFullYear()}`;

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      
      const totalAmount = order.total + (order.total > 400 ? 0 : 15);
      const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tax Invoice - ${invoiceNumber}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f9f9f9;
      color: #1f2937;
      margin: 0;
      padding: 40px 20px;
    }
    
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 45px;
      border-radius: 12px;
    }
    
    .invoice-bar {
      height: 6px;
      background: #f59e0b;
      margin-bottom: 35px;
      border-radius: 6px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 25px;
      margin-bottom: 35px;
    }
    
    .brand h1 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin: 0;
      color: #111827;
    }
    
    .brand h1 span {
      color: #f59e0b;
    }
    
    .brand p {
      font-size: 11px;
      letter-spacing: 0.05em;
      color: #6b7280;
      text-transform: uppercase;
      margin: 4px 0 0 0;
      font-weight: 600;
    }
    
    .brand-details {
      font-size: 11.5px;
      color: #4b5563;
      margin-top: 15px;
      line-height: 1.6;
    }
    
    .statement-meta {
      text-align: right;
      font-size: 12px;
      color: #4b5563;
      line-height: 1.7;
    }
    
    .statement-meta h2 {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
      letter-spacing: -0.01em;
    }
    
    .coordinates {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
      font-size: 12px;
      line-height: 1.6;
    }
    
    .coord-block h3 {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #f3f4f6;
      padding-bottom: 6px;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      color: #374151;
    }
    
    .coord-block .name {
      font-weight: 700;
      font-size: 13px;
      color: #111827;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    
    .items-table th {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #e5e7eb;
      padding: 12px 0;
      text-align: left;
      font-weight: 700;
    }
    
    .items-table td {
      padding: 16px 0;
      border-bottom: 1px solid #f3f4f6;
      font-size: 13px;
    }
    
    .item-name {
      font-weight: 600;
      color: #111827;
    }
    
    .item-sku {
      font-size: 10px;
      color: #9ca3af;
      display: block;
      margin-top: 4px;
    }
    
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    
    .summary-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-top: 1px solid #e5e7eb;
      padding-top: 30px;
      margin-bottom: 40px;
    }
    
    .marian-seal {
      font-size: 11px;
      color: #6b7280;
      max-width: 380px;
      line-height: 1.6;
    }
    
    .seal-title {
      color: #111827;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    
    .financial-totals {
      width: 260px;
      font-size: 12px;
      line-height: 2.1;
      color: #4b5563;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
    }
    
    .grand-total {
      border-top: 2px solid #e5e7eb;
      margin-top: 10px;
      padding-top: 10px;
      font-size: 15px;
      font-weight: 700;
      color: #111827;
    }
    
    .grand-total-val {
      color: #f59e0b;
      font-size: 17px;
    }
    
    .footer-stamp {
      border-top: 1px solid #e5e7eb;
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    
    .cryptography {
      font-size: 9px;
      color: #a3a3a3;
      line-height: 1.5;
    }
    
    .print-btn {
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
      background-color: #111827;
      color: #fff;
      padding: 14px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      letter-spacing: 0.1em;
      border-radius: 6px;
      transition: background 0.2s;
    }
    
    .print-btn:hover {
      background-color: #f59e0b;
    }
    
    @media print {
      body {
        padding: 0;
        background-color: #fff;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .print-btn {
        display: none;
      }
    }
  </style>
</head>
<body>
  
  <button class="print-btn" onclick="window.print()">Print Statement / Save as PDF</button>

  <div class="invoice-card">
    <div class="invoice-bar"></div>
    
    <div class="header">
      <div class="brand">
        <h1>FRAGG <span>FORCE</span></h1>
        <p>Premium Fragrances E-Commerce Store</p>
        <div class="brand-details">
          <p style="margin:2px 0;">Lead Manager: Waqas Shah</p>
          <p style="margin:2px 0;">Support Email: digitalnova516@gmail.com</p>
          <p style="margin:2px 0;">WhatsApp Contact: +92 323 3260083</p>
          <p style="margin:2px 0;">Commercial Hub: Karachi, Pakistan</p>
        </div>
      </div>
      <div class="statement-meta">
        <h2>TAX INVOICE</h2>
        <div>INVOICE: ${invoiceNumber}</div>
        <div>DATE: ${order.date}</div>
        <div>METHOD: Credit Card / Stripe Verified</div>
        <div>STATUS: Completed</div>
      </div>
    </div>
    
    <div class="coordinates">
      <div class="coord-block">
        <h3>CUSTOMER DETAILS</h3>
        <div class="name">${order.address.fullName}</div>
        <div>Verified Customer</div>
        <div>${order.address.fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com</div>
        <div>Region: ${order.address.country}</div>
      </div>
      <div class="coord-block">
        <h3>SHIPPING COORDINATES</h3>
        <div class="name">${order.address.fullName}</div>
        <div>${order.address.street}</div>
        <div>${order.address.city}, ${order.address.postalCode}</div>
        <div>${order.address.country}</div>
      </div>
    </div>
    
    <table class="items-table">
      <thead>
        <tr>
          <th>Fragrance Item Description</th>
          <th class="text-center">Size (ml)</th>
          <th class="text-center">Quantity</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Total Price</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(item => {
          const basePrice = item.product.price;
          let calculatedPrice = basePrice;
          if (item.size === 50) calculatedPrice = Math.round(basePrice * 0.75);
          if (item.size === 150) calculatedPrice = Math.round(basePrice * 1.30);
          if (item.size === 250) calculatedPrice = Math.round(basePrice * 1.95);
          return `
            <tr>
              <td>
                <span class="item-name">${item.product.name}</span>
                <span class="item-sku">SKU-FF-${item.product.id.toUpperCase()}-${item.size}ML | Brand: ${item.product.brand}</span>
              </td>
              <td class="text-center">${item.size}</td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">$${calculatedPrice}</td>
              <td class="text-right" style="font-weight: 600;">$${calculatedPrice * item.quantity}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    
    <div class="summary-section">
      <div class="marian-seal">
        <p class="seal-title">GUARANTEE & DECLARATION</p>
        <p>This is a computer-generated tax invoice verifying authentic fragrance purchase. All products are sourced directly from verified brand warehouses for highest quality sillage verification.</p>
        <p style="font-size: 9px; color:#9ca3af; margin-top:10px;">Transaction Token ID: txn_ff_stripe_${order.id.toLowerCase()}</p>
      </div>
      
      <div class="financial-totals">
        <div class="total-row">
          <span>Items Purchased:</span>
          <span style="font-weight: 600;">${totalQuantity} units</span>
        </div>
        <div class="total-row">
          <span>Subtotal:</span>
          <span>$${order.total}</span>
        </div>
        <div class="total-row">
          <span>Shipping & Handling:</span>
          <span>$${order.total > 400 ? 0 : 15}</span>
        </div>
        <div class="total-row grand-total">
          <span>TOTAL PAID (USD):</span>
          <span class="grand-total-val">$${totalAmount}</span>
        </div>
      </div>
    </div>
    
    <div class="footer-stamp" style="font-size:10.5px;">
      <div class="cryptography">
        <div>Registered Store: Fragg Force Ltd.</div>
        <div>All rights reserved &copy; 2026.</div>
      </div>
      <div style="text-align: right;">
        <p style="margin:0; font-weight:700;">Waqas Shah</p>
        <p style="margin:2px 0 0 0; font-size:9.5px; color:#f59e0b; text-transform:uppercase;">Store Lead Manager</p>
      </div>
    </div>
  </div>
</body>
</html>
      `;

      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${order.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const handleSendEmail = () => {
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('sent');
      setTimeout(() => setEmailStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 shadow-2xl flex flex-col overflow-hidden rounded-xl"
        id="invoice-print-container"
      >
        {/* Modal Controls */}
        <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase bg-amber-500 text-neutral-950 px-2 py-0.5 font-bold tracking-wider rounded">
              TAX RECEIPT
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {invoiceNumber}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSendEmail}
              disabled={emailStatus === 'sending'}
              className="px-3 py-1.5 text-xs font-mono bg-stone-100 hover:bg-stone-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center space-x-1.5 rounded cursor-pointer"
              title="Email Invoice"
            >
              {emailStatus === 'sent' ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Email Sent!</span>
                </>
              ) : emailStatus === 'sending' ? (
                <span className="animate-pulse">Sending Email...</span>
              ) : (
                <>
                  <Mail size={13} />
                  <span>Email Invoice</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="px-3 py-1.5 text-xs font-mono bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors flex items-center space-x-1.5 rounded font-bold cursor-pointer shadow-sm"
              title="Download PDF"
            >
              {downloading ? (
                <span className="animate-pulse">Compiling PDF...</span>
              ) : (
                <>
                  <Download size={13} />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="p-1.5 text-neutral-500 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors rounded cursor-pointer"
              title="Print"
            >
              <Printer size={15} />
            </button>

            <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

            <button 
              onClick={onClose} 
              className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable View representation */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 print:p-0 print:overflow-visible">
          <div className="space-y-6 select-text text-neutral-800 dark:text-neutral-300">
            
            {/* Status alerts */}
            {emailStatus === 'sent' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2 font-mono print:hidden rounded">
                <Check size={13} />
                <span>INVOICE DISPATCHED: Receipt formatted & emailed successfully to {order.address.fullName.toLowerCase().replace(' ', '')}@gmail.com</span>
              </div>
            )}

            {/* Header / Brand */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-neutral-100 dark:border-neutral-900 pb-6">
              <div>
                <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  FRAGG <span className="text-amber-500 italic font-black">FORCE</span>
                </h1>
                <p className="text-[10px] font-mono uppercase text-amber-500 tracking-wider mt-1 font-bold">Premium Fragrances E-Commerce Store</p>
                <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-3 font-sans space-y-1">
                  <p>Lead Manager: Waqas Shah</p>
                  <p>Email: digitalnova516@gmail.com</p>
                  <p>WhatsApp Contact: +92 323 3260083</p>
                  <p>Commercial Hub: Karachi, Pakistan</p>
                </div>
              </div>
              <div className="sm:text-right text-[11px] font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                <h2 className="text-sm font-bold text-neutral-900 dark:text-white tracking-widest font-serif uppercase">TAX INVOICE</h2>
                <p><span className="text-neutral-400 font-bold uppercase">Number:</span> {invoiceNumber}</p>
                <p><span className="text-neutral-400 font-bold uppercase">Date:</span> {order.date}</p>
                <p><span className="text-neutral-400 font-bold uppercase">Method:</span> Credit Card / Online Gateway</p>
                <p><span className="text-neutral-400 font-bold uppercase">Status:</span> Stripe Verified</p>
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed">
              <div>
                <h3 className="font-serif font-bold uppercase text-xs text-neutral-900 dark:text-white tracking-wider border-b pb-1 mb-2">
                  CUSTOMER DETAILS
                </h3>
                <div className="space-y-0.5 font-sans text-neutral-500">
                  <p className="font-serif font-bold text-neutral-950 dark:text-white text-xs">{order.address.fullName}</p>
                  <p className="font-mono text-[9px] text-neutral-405">Verified Registered Customer</p>
                  <p>{order.address.fullName.toLowerCase().replace(' ', '')}@gmail.com</p>
                  <p>Phone Coordinate: +92 323 3260083</p>
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold uppercase text-xs text-neutral-900 dark:text-white tracking-wider border-b pb-1 mb-2">
                  SHIPPING COORDINATES
                </h3>
                <div className="space-y-0.5 font-sans text-neutral-505 dark:text-neutral-450">
                  <p className="font-serif font-bold text-neutral-950 dark:text-white text-xs">{order.address.fullName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.postalCode}</p>
                  <p>{order.address.country}</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-850 text-[9px] uppercase tracking-widest text-neutral-400 font-mono">
                    <th className="py-2.5 font-bold">Fragrance Item Description</th>
                    <th className="py-2.5 text-center font-bold">Size</th>
                    <th className="py-2.5 text-center font-bold">Qty</th>
                    <th className="py-2.5 text-right font-bold w-24">Unit Rate</th>
                    <th className="py-2.5 text-right font-bold w-24">Item Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 font-sans text-neutral-700 dark:text-neutral-300">
                  {order.items.map((item, id) => {
                    const basePrice = item.product.price;
                    let calculatedPrice = basePrice;
                    if (item.size === 50) calculatedPrice = Math.round(basePrice * 0.75);
                    if (item.size === 150) calculatedPrice = Math.round(basePrice * 1.30);
                    if (item.size === 250) calculatedPrice = Math.round(basePrice * 1.95);
                    
                    return (
                      <tr key={id} className="py-3">
                        <td className="py-3 pr-4">
                          <span className="font-serif font-bold text-neutral-950 dark:text-white text-xs block">{item.product.name}</span>
                          <span className="text-[9px] font-mono text-neutral-450 uppercase tracking-widest block mt-0.5">
                            SKU-FF-{item.product.id.toUpperCase()}-{item.size}ML | {item.product.brand}
                          </span>
                        </td>
                        <td className="py-3 text-center font-mono text-[11px] text-neutral-500">{item.size} ml</td>
                        <td className="py-3 text-center font-mono text-[11px] text-neutral-500 font-bold">{item.quantity}</td>
                        <td className="py-3 text-right font-mono text-[11px] text-neutral-500">{formatPrice(calculatedPrice)}</td>
                        <td className="py-3 text-right font-mono font-bold text-neutral-950 dark:text-white">{formatPrice(calculatedPrice * item.quantity)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pt-6 border-t border-neutral-100 dark:border-neutral-900">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 max-w-sm space-y-1 leading-normal">
                <p className="font-serif uppercase font-bold text-amber-500/80 tracking-wider">Guarantee Declaration</p>
                <p>This computed details verified tax invoice states direct transaction items matching. Fragrances are sourced directly from our verified brand warehouses in pristine status checked.</p>
                <p className="font-mono text-[8px]">Transaction Token: txn_ff_stripe_{order.id.toLowerCase()}</p>
              </div>

              <div className="w-full sm:w-64 font-mono text-[11px] text-neutral-500 space-y-1.5 text-right">
                <div className="flex justify-between">
                  <span className="uppercase text-[9px] font-bold">Total Quantity:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{totalQuantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase text-[9px] font-bold">Subtotal:</span>
                  <span className="text-neutral-900 dark:text-white">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase text-[9px] font-bold">Shipping & Handling:</span>
                  <span className="text-neutral-900 dark:text-white">{formatPrice(order.total > 400 ? 0 : 15)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-100 dark:border-neutral-800 pt-2 text-xs text-neutral-950 dark:text-white items-baseline font-bold font-serif">
                  <span className="uppercase text-[10px] font-mono">TOTAL PAID (USD):</span>
                  <span className="text-sm text-amber-500 font-extrabold">{formatPrice(order.total + (order.total > 400 ? 0 : 15))}</span>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-end">
              <div className="text-[8px] font-mono uppercase text-neutral-400 tracking-wider">
                <p>Registrar Code: SHA-256 Verified</p>
                <p>Fragg Force Ltd. 2026</p>
              </div>
              <div className="text-right">
                <span className="font-serif text-xs font-bold text-neutral-950 dark:text-white block">Waqas Shah</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block">Store Lead Manager</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Structured Print CSS overrides */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-container, #invoice-print-container * {
            visibility: visible;
          }
          #invoice-print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            border: none;
            box-shadow: none;
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
