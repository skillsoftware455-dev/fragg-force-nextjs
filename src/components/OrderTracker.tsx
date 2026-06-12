import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  Check, 
  Truck, 
  Package, 
  MapPin, 
  Calendar, 
  FileText, 
  ClipboardCheck, 
  FileEdit, 
  HelpCircle,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { motion } from 'motion/react';

const STATUS_FLOW: Order['status'][] = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out For Delivery',
  'Delivered'
];

const STATUS_DETAILS = {
  'Order Placed': {
    title: 'Order Placed',
    description: 'We have received your order request and are verifying stock availability.',
    icon: FileText,
  },
  'Confirmed': {
    title: 'Payment Confirmed',
    description: 'Your payment was successfully compiled, and your allocation is secured.',
    icon: ClipboardCheck,
  },
  'Processing': {
    title: 'Processing Order',
    description: 'Items are being fetched from our warehouse and sent to the QA station.',
    icon: FileEdit,
  },
  'Packed': {
    title: 'Securely Packed',
    description: 'Fragrances are wrapped in protective foam buffers and placed in our shipping crates.',
    icon: Package,
  },
  'Shipped': {
    title: 'Dispatched / In Transit',
    description: 'Your package is loaded and currently traveling via DHL courier networks.',
    icon: Truck,
  },
  'Out For Delivery': {
    title: 'Out for Local Delivery',
    description: 'The driver has loaded your package in the local van and will arrive today.',
    icon: MapPin,
  },
  'Delivered': {
    title: 'Successfully Delivered',
    description: 'The parcel was signed and accepted at your designated coordinates.',
    icon: Check,
  }
};

export const OrderTracker: React.FC = () => {
  const { orders, updateOrder } = useStore();
  
  // Select first order by default
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[0].id : ''
  );
  
  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  // Quick state to handle customizable user note
  const [deliveryNote, setDeliveryNote] = useState('Please call upon arrival or leave with neighbor if unavailable.');
  const [editingNote, setEditingNote] = useState(false);

  if (orders.length === 0 || !selectedOrder) {
    return (
      <div className="p-12 text-center bg-stone-50 dark:bg-neutral-900/30 border border-neutral-150 dark:border-neutral-850 rounded-2xl">
        <Inbox className="mx-auto text-neutral-400 mb-3" size={40} />
        <h3 className="font-serif text-base font-bold text-neutral-850 dark:text-neutral-100">No active tracking history</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
          You currently have no orders in your history. Once you complete a purchase, your tracking status will sync here.
        </p>
      </div>
    );
  }

  const currentStatusIndex = STATUS_FLOW.indexOf(selectedOrder.status);

  const handleSimulateNextStage = () => {
    const nextIndex = (currentStatusIndex + 1) % STATUS_FLOW.length;
    const nextStatus = STATUS_FLOW[nextIndex];
    updateOrder(selectedOrder.id, { status: nextStatus });
  };

  const currentDetails = STATUS_DETAILS[selectedOrder.status] || STATUS_DETAILS['Order Placed'];

  // WhatsApp helper generators
  const supportPhone = '923233260083'; // Clean numeric representation of +92 323 3260083
  
  const getWhatsAppLink = (type: 'support' | 'product' | 'tracking' | 'confirmation') => {
    let text = '';
    switch(type) {
      case 'support':
        text = `Hello Fragg Force,\nI need general customer assistance regarding my account options.`;
        break;
      case 'product':
        text = `Hello Fragg Force,\nI would like to inquire about premium fragrance restocks and olfactive notes matching.`;
        break;
      case 'tracking':
        text = `Hello Fragg Force,\nI am inquiring about the tracking progress of Order ID: ${selectedOrder.id}.\nCurrent state: ${selectedOrder.status}.\nTracking URL: ${window.location.origin}`;
        break;
      case 'confirmation':
        text = `Hello Fragg Force,\nI wanted to confirm receipt/settlement for Order ID: ${selectedOrder.id}.\nTotal Amount: ${selectedOrder.total}.`;
        break;
    }
    return `https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-stone-50/50 dark:bg-neutral-955/40 border border-neutral-150 dark:border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-8" id="order-tracking-utility">
      
      {/* Selector and Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/50 dark:border-neutral-900/50 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-950 dark:text-white">Order Tracking Console</h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time fulfillment stages. Sourced from standard inventory logistics.
          </p>
        </div>

        {/* Dropdown list of current customer orders */}
        <div className="flex items-center space-x-2.5 self-start md:self-auto">
          <label htmlFor="order-nav-select" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Selected Order:</label>
          <select
            id="order-nav-select"
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="text-xs font-mono font-bold bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-850 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.id} &mdash; {o.status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Shipment Tracker Metadata Grid Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white dark:bg-neutral-950/60 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-900">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-neutral-405 uppercase tracking-widest block">Order ID</span>
          <span className="text-xs font-mono font-bold text-neutral-950 dark:text-white block">{selectedOrder.id}</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-neutral-405 uppercase tracking-widest block">Tracking Code</span>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block">
            {selectedOrder.trackingCode || `TNT-${selectedOrder.id.replace('ORD-', '')}-EX`}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-neutral-405 uppercase tracking-widest block">Courier Service</span>
          <span className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200 block">
            {selectedOrder.courierName || 'DHL Express Partner'}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-neutral-405 uppercase tracking-widest block">Estimated Arrival</span>
          <span className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-100 flex items-center space-x-1">
            <Calendar size={13} className="text-amber-500" />
            <span>{selectedOrder.estimatedDeliveryDate || '5 Business Days'}</span>
          </span>
        </div>
      </div>

      {/* Main progress pipeline layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Real-world 7 step pipeline timeline */}
        <div className="lg:col-span-8 space-y-6">
          <h4 className="text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-400">Order Delivery Waypoint Progress</h4>

          {/* Stepper nodes container */}
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 sm:gap-2">
            {STATUS_FLOW.map((status, index) => {
              const isCompleted = index < currentStatusIndex;
              const isActive = index === currentStatusIndex;
              const isPending = index > currentStatusIndex;
              
              const nodeDetails = STATUS_DETAILS[status];
              const NodeIcon = nodeDetails.icon;

              return (
                <div 
                  key={index} 
                  className={`relative p-3.5 border transition-all rounded-xl text-left sm:text-center flex sm:flex-col items-center sm:justify-start gap-3 sm:gap-2 ${
                    isActive 
                      ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/10' 
                      : isCompleted 
                        ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-500/2'
                        : 'bg-white dark:bg-neutral-950/20 border-neutral-150 dark:border-neutral-900'
                  }`}
                >
                  {/* Status Indicator circle icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive 
                      ? 'bg-amber-500 text-neutral-950 animate-pulse' 
                      : isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-500' 
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400'
                  }`}>
                    {isCompleted ? <Check size={14} className="stroke-[3]" /> : <NodeIcon size={14} />}
                  </div>

                  {/* Text descriptions */}
                  <div className="min-w-0">
                    <p className={`text-[10.5px] font-sans font-bold leading-tight truncate sm:text-center ${
                      isActive 
                        ? 'text-amber-600 dark:text-amber-400' 
                        : isCompleted
                          ? 'text-emerald-600 dark:text-emerald-500'
                          : 'text-neutral-400 dark:text-neutral-550'
                    }`}>
                      {status}
                    </p>
                    <p className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider sm:text-center mt-0.5">
                      Stage {index + 1}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detailed Summary Description */}
          <div className="p-5 bg-white dark:bg-neutral-950/40 border border-neutral-150 dark:border-neutral-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-neutral-950 dark:bg-neutral-900 text-amber-500 border border-amber-500/20 rounded-xl">
              {React.createElement(currentDetails.icon, { size: 24 })}
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-mono uppercase bg-amber-500 text-neutral-950 font-bold px-2 py-0.5 tracking-widest inline-block rounded mb-1">
                Current Status
              </span>
              <h5 className="text-sm font-serif font-bold text-neutral-900 dark:text-white">{currentDetails.title}</h5>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-0.5">{currentDetails.description}</p>
            </div>
          </div>
        </div>

        {/* Action centers on right: Simulation controller and structured WhatsApp templates */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-world simulator block */}
          <div className="p-5 rounded-2xl bg-neutral-950 text-white border border-amber-500/10 space-y-4">
            <div className="flex items-center space-x-1.5 border-b border-neutral-900 pb-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-neutral-200">Order Stage Simulator</h4>
            </div>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Test and review the realistic status pipeline changes. Real customers will see updates instantly as orders progress.
            </p>
            <button 
              onClick={handleSimulateNextStage}
              className="w-full bg-amber-500 hover:bg-amber-400 hover:scale-[1.01] text-neutral-950 p-2.5 rounded font-mono text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer shadow-md"
            >
              Simulate Next Status Stage
            </button>
          </div>

          {/* WhatsApp Support integration desk with all required options */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/40 border border-neutral-150 dark:border-neutral-900 space-y-4">
            <div className="flex items-center space-x-2 border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <MessageSquare size={14} className="text-emerald-500" />
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-neutral-800 dark:text-neutral-200">WhatsApp Help Center</h4>
            </div>
            
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Click any route to initiate official support templates on WhatsApp with manager Waqas Shah.
            </p>

            <div className="space-y-2 pt-1.5">
              <a 
                href={getWhatsAppLink('tracking')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500 text-emerald-700 dark:text-emerald-400 text-xs transition duration-200 font-medium"
              >
                <span>Order Tracking Inquiry</span>
                <Check size={12} />
              </a>

              <a 
                href={getWhatsAppLink('confirmation')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 bg-stone-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs transition duration-200 font-medium"
              >
                <span>Order Confirmation Help</span>
                <HelpCircle size={12} className="text-neutral-400" />
              </a>

              <a 
                href={getWhatsAppLink('product')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 bg-stone-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs transition duration-200 font-medium"
              >
                <span>Perfume Product Inquiry</span>
                <HelpCircle size={12} className="text-neutral-400" />
              </a>

              <a 
                href={getWhatsAppLink('support')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 bg-stone-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs transition duration-200 font-medium"
              >
                <span>Contact General Support</span>
                <HelpCircle size={12} className="text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Delivery Note card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/40 border border-neutral-150 dark:border-neutral-900 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-2">
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-neutral-800 dark:text-neutral-200">Customer Instructions</h4>
              <button 
                onClick={() => setEditingNote(!editingNote)}
                className="text-[10px] font-mono text-amber-500 hover:underline cursor-pointer font-bold uppercase"
              >
                {editingNote ? 'Save' : 'Edit'}
              </button>
            </div>

            {editingNote ? (
              <textarea
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                rows={3}
                className="w-full p-2 bg-stone-50 dark:bg-black border border-neutral-250 dark:border-neutral-850 rounded text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 font-sans"
              />
            ) : (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-450 italic leading-relaxed">
                "{deliveryNote}"
              </p>
            )}
            
            <div className="flex items-center space-x-1.5 text-[9px] text-neutral-400 font-mono">
              <AlertCircle size={10} className="text-neutral-400" />
              <span>Instructions will print on your shipping slip.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
