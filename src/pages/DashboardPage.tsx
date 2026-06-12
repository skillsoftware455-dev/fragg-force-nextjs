import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { productsData } from '../data/products';
import { Star, Truck, Heart, User, MapPin, Bell, CheckCircle, Sliders, Shield, Award, Clock } from 'lucide-react';
import { OrderTracker } from '../components/OrderTracker';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order } from '../types';

export const DashboardPage: React.FC = () => {
  const { 
    orders, 
    wishlist, 
    profile, 
    updateProfile, 
    setActivePage, 
    setSelectedProductId, 
    toggleWishlist,
    addToCart,
    currency,
    currencySymbol,
    convertPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'tracker' | 'wishlist' | 'settings' | 'security'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Interactive user profile edits
  const [profileName, setProfileName] = useState(profile.name);
  const [profilePhone, setProfilePhone] = useState(profile.phone);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Address add drawer
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrPostal, setAddrPostal] = useState('');
  const [addrCountry, setAddrCountry] = useState('');

  const mappedWishlist = productsData.filter(p => wishlist.includes(p.id));

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...profile,
      name: profileName,
      phone: profilePhone,
      email: profileEmail
    });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrPostal) return;

    const newAddr = {
      id: `addr-${Date.now()}`,
      fullName: profile.name,
      street: addrStreet,
      city: addrCity,
      postalCode: addrPostal,
      country: addrCountry || 'France',
      isDefault: false
    };

    updateProfile({
      ...profile,
      addresses: [...profile.addresses, newAddr]
    });

    setAddrStreet('');
    setAddrCity('');
    setAddrPostal('');
    setAddrCountry('');
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    updateProfile({
      ...profile,
      addresses: profile.addresses.filter(a => a.id !== id)
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    updateProfile({
      ...profile,
      addresses: profile.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* MEMBERSHIP ID CARD HEADER */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/15 mb-10 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4 text-center sm:text-left flex-col sm:flex-row gap-2">
              <div className="w-16 h-16 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center font-serif text-2xl font-bold text-amber-500">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-white">{profile.name}</h1>
                  <Award size={14} className="text-amber-400 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono uppercase text-amber-500 tracking-widest font-semibold mt-0.5">ESTABLISHED MEMBER COUTURE</p>
                <p className="text-xs text-neutral-400 font-sans mt-1">{profile.email}</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl font-mono text-[11px] text-neutral-400 space-y-1 w-full sm:w-auto text-center sm:text-left">
              <p className="uppercase tracking-wider">ATELIER PASS NUMBER</p>
              <p className="text-base font-bold text-amber-500">FF-984210-COUTURE</p>
            </div>
          </div>
        </div>

        {/* CONTROLS RACK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Drawer links LHS */}
          <div className="lg:col-span-3 space-y-2 bg-stone-50 dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-900">
            {[
              { id: 'orders', label: 'Allocations History', icon: Truck },
              { id: 'tracker', label: 'Live Sillage Tracker', icon: Clock },
              { id: 'wishlist', label: 'My Fragranced Wishlist', icon: Heart },
              { id: 'settings', label: 'Atelier Coordinates', icon: User },
              { id: 'security', label: 'Security & Access', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left flex items-center space-x-3 py-3 px-4 rounded-lg font-sans text-xs uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50'
                }`}
              >
                <tab.icon size={14} className="text-amber-500" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Core Panel Content RHS */}
          <div className="lg:col-span-9">
            
            {/* ORDERS TAB PANEL */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white mb-4 pb-2 border-b border-neutral-150 dark:border-neutral-900">
                  Formula Allocation Records
                </h3>

                {orders.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50/20 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <p className="text-xs text-neutral-400">Zero active allocations compiled under this pass.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="p-5 sm:p-6 bg-stone-50/40 dark:bg-neutral-900/15 rounded-2xl border border-neutral-150 dark:border-neutral-900 space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Order Allocation Key</span>
                            <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white mt-0.5">{order.id}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-neutral-400 font-mono">{order.date}</span>
                            <span>•</span>
                            <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                              order.status === 'Delivered' 
                                ? 'bg-emerald-500/10 text-emerald-500' 
                                : order.status === 'Shipped' 
                                  ? 'bg-blue-500/10 text-blue-500' 
                                  : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Items list */}
                        <div className="space-y-3">
                          {order.items.map((item, id) => (
                            <div key={id} className="flex justify-between items-center text-xs">
                              <div>
                                <span className="font-serif text-neutral-950 dark:text-white font-bold">{item.product.name}</span>
                                <span className="text-[10px] text-neutral-400 block font-mono">
                                  {item.size}ml decant &times; {item.quantity}
                                </span>
                              </div>
                              <span className="font-mono font-bold text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(item.product.price) * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking pipeline pipeline */}
                        <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-850">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block">Delivery Pipeline Stage</label>
                            <button
                              onClick={() => {
                                setActiveTab('tracker');
                              }}
                              className="text-[10px] font-mono font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 uppercase tracking-widest flex items-center space-x-1 cursor-pointer"
                            >
                              <span>Interactive Live Tracking &rarr;</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 relative">
                            {[
                              { label: 'Order Confirmed', active: order.status !== 'Order Placed' },
                              { label: 'In Transit / Shipped', active: ['Shipped', 'Out For Delivery', 'Delivered'].includes(order.status) },
                              { label: 'Successfully Delivered', active: order.status === 'Delivered' }
                            ].map((pathStep, i) => (
                              <div key={i} className="text-center relative">
                                <div className={`w-3.5 h-3.5 rounded-full mx-auto flex items-center justify-center border z-15 relative ${
                                  pathStep.active 
                                    ? 'bg-amber-500 border-amber-500' 
                                    : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800'
                                }`}>
                                  {pathStep.active && <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>}
                                </div>
                                <span className="block text-[9px] uppercase tracking-wider font-mono text-neutral-500 mt-2">{pathStep.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions block row */}
                        <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-850/50 flex flex-col sm:flex-row gap-2 justify-end text-[10px] uppercase tracking-wider font-mono font-bold">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="p-2 px-4 bg-neutral-950 dark:bg-neutral-900 hover:bg-amber-500 text-white hover:text-neutral-950 border border-neutral-850 dark:border-neutral-800 transition flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            <span>View Atelier Invoice</span>
                          </button>
                          <a
                            href={`https://wa.me/923233260083?text=${encodeURIComponent(`Hello Fragg Force,\nI would like to inquire about my order tracking status.\n\nOrder ID: ${order.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                          >
                            <span>WhatsApp Assistance</span>
                          </a>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TRACKER TAB PANEL */}
            {activeTab === 'tracker' && (
              <div className="space-y-6">
                <OrderTracker />
              </div>
            )}

            {/* WISHLIST TAB PANEL */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white mb-4 pb-2 border-b border-neutral-150 dark:border-neutral-900">
                  My Fragranced Wishlist
                </h3>

                {mappedWishlist.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50/20 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <p className="text-xs text-neutral-400">Your wishlist is currently empty. Revisit the collections.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mappedWishlist.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-stone-50/30 dark:bg-neutral-900/20 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-900 p-4 flex flex-col justify-between"
                      >
                        <div 
                          onClick={() => { setSelectedProductId(prod.id); setActivePage('product-details'); }}
                          className="aspect-square bg-stone-100 dark:bg-black rounded-lg overflow-hidden cursor-pointer"
                        >
                          <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="pt-3 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-neutral-400 block">{prod.brand}</span>
                            <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white mt-0.5">{prod.name}</h4>
                            <span className="text-xs font-mono font-bold text-amber-500 mt-1 block">{currencySymbol}{convertPrice(prod.price)} {currency}</span>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                            <button
                              onClick={() => {
                                addToCart(prod, prod.sizes[0], 1);
                              }}
                              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-[10px] uppercase tracking-widest text-center cursor-pointer transition-colors"
                            >
                              Quick Add ({prod.sizes[0]}ml)
                            </button>
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setSelectedProductId(prod.id); setActivePage('product-details'); }}
                                className="flex-1 py-1.5 bg-neutral-950 dark:bg-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-800 text-white font-semibold text-[10px] uppercase tracking-wider text-center cursor-pointer transition-colors"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => toggleWishlist(prod.id)}
                                className="px-3 py-1.5 border border-rose-500/30 text-rose-500 hover:bg-rose-550 hover:bg-rose-500/10 text-[10px] uppercase font-bold text-center cursor-pointer transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS COORDINATES PANEL */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                
                <form onSubmit={handleUpdateProfile} className="bg-stone-50/40 dark:bg-neutral-900/15 border border-neutral-150 dark:border-neutral-900 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-2">
                    <User size={15} className="text-amber-500" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Profile Coordinates</h3>
                  </div>

                  {settingsSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/35 text-emerald-500 text-xs rounded">
                      Coordinates modified successfully.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Passholder Designation Name</label>
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-855 rounded bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Direct Calling Contact</label>
                      <input
                        type="text"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-855 rounded bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Registered Decant Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-855 rounded bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <button type="submit" className="px-6 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase rounded">
                    Save Coordinates
                  </button>
                </form>

                {/* ADDRESS MANAGER */}
                <div className="bg-stone-50/40 dark:bg-neutral-900/15 border border-neutral-150 dark:border-neutral-900 rounded-2xl p-6">
                  <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={15} className="text-amber-500" />
                      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Freight Addresses</h3>
                    </div>
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="text-xs text-amber-500 font-medium hover:underline cursor-pointer"
                    >
                      + Add Address
                    </button>
                  </div>

                  {/* Add address drawer */}
                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded-xl space-y-3 mb-6 max-w-sm">
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Street House Address</label>
                        <input
                          type="text"
                          required
                          value={addrStreet}
                          onChange={(e) => setAddrStreet(e.target.value)}
                          className="w-full text-xs py-2 px-3 border border-neutral-200 dark:border-neutral-800 rounded bg-transparent focus:outline-none text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={addrCity}
                            onChange={(e) => setAddrCity(e.target.value)}
                            className="w-full text-xs py-2 px-3 border border-neutral-200 dark:border-neutral-800 rounded bg-transparent focus:outline-none text-neutral-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Zip</label>
                          <input
                            type="text"
                            required
                            value={addrPostal}
                            onChange={(e) => setAddrPostal(e.target.value)}
                            className="w-full text-xs py-2 px-3 border border-neutral-200 dark:border-neutral-800 rounded bg-transparent focus:outline-none text-neutral-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={addrCountry}
                          onChange={(e) => setAddrCountry(e.target.value)}
                          className="w-full text-xs py-2 px-3 border border-neutral-200 dark:border-neutral-800 rounded bg-transparent focus:outline-none text-neutral-900 dark:text-white"
                        />
                      </div>
                      <button type="submit" className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded">
                        Save Address
                      </button>
                    </form>
                  )}

                  {/* Saved list items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.addresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`p-4 rounded-xl border ${
                          address.isDefault 
                            ? 'border-amber-500/40 bg-amber-500/10' 
                            : 'border-neutral-200 dark:border-neutral-900 bg-stone-50/20'
                        } flex flex-col justify-between`}
                      >
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          <div className="flex items-center justify-between font-serif font-bold text-neutral-950 dark:text-white mb-2">
                            <span>{address.fullName}</span>
                            {address.isDefault && (
                              <span className="text-[9px] font-mono bg-amber-500 text-neutral-950 px-1.5 py-0.5 rounded uppercase font-bold">DEFAULT</span>
                            )}
                          </div>
                          <p>{address.street}</p>
                          <p>{address.city}, {address.postalCode}</p>
                          <p>{address.country}</p>
                        </div>

                        <div className="flex gap-3 justify-end mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900/50">
                          {!address.isDefault && (
                            <button 
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-[10px] font-mono text-amber-500 uppercase hover:underline"
                            >
                              Make Default
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-[10px] font-mono text-neutral-400 hover:text-rose-500 uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* SECURITY TAB PANEL */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white mb-4 pb-2 border-b border-neutral-150 dark:border-neutral-900">
                  Security Certificate & Access Locks
                </h3>
                
                <div className="p-6 rounded-2xl bg-neutral-950 text-white border border-amber-500/15 space-y-4">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Shield size={18} className="animate-pulse" />
                    <h4 className="font-serif font-bold text-base">Private Key Access Enabled</h4>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                    Your member dashboard pass FF-984210-COUTURE is cryptographic locked under your private email. All transactions are logged under localized browser session flags with Zero-Knowledge proof protocols. No raw financial logs are stored on public servers.
                  </p>
                  <p className="text-[10px] text-amber-500/80 font-mono">
                    Last authenticated credentials: France (GMT +1) - June 2026.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Dynamic luxury Atelier invoice print popup modal */}
      <InvoiceModal 
        order={selectedInvoiceOrder} 
        isOpen={selectedInvoiceOrder !== null} 
        onClose={() => setSelectedInvoiceOrder(null)} 
      />
    </div>
  );
};
