import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Sparkles, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order, Coupon } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    placeOrder, 
    profile, 
    setActivePage, 
    currency, 
    currencySymbol, 
    convertPrice, 
    coupons, 
    incrementCouponUsage,
    appliedCoupon,
    setAppliedCoupon
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address inputs (defaulted to user profile default)
  const defaultAddress = profile.addresses.find(a => a.isDefault) || profile.addresses[0];
  
  const [fullName, setFullName] = useState(defaultAddress?.fullName || 'Lady Seraphina');
  const [street, setStreet] = useState(defaultAddress?.street || '742 Rue du Faubourg Saint-Honoré');
  const [city, setCity] = useState(defaultAddress?.city || 'Paris');
  const [postalCode, setPostalCode] = useState(defaultAddress?.postalCode || '75008');
  const [country, setCountry] = useState(defaultAddress?.country || 'France');

  // Payment inputs
  const [cardName, setCardName] = useState('Lady Seraphina');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCVV, setCardCVV] = useState('007');
  const [useGoldCard, setUseGoldCard] = useState(false); // luxury custom card trigger

  // Coupon Promotion application states
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Order summary details
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const basePrice = item.product.price;
      let priceUnit = basePrice;
      if (item.size === 50) priceUnit = Math.round(basePrice * 0.75);
      if (item.size === 150) priceUnit = Math.round(basePrice * 1.30);
      if (item.size === 250) priceUnit = Math.round(basePrice * 1.95);
      return acc + (priceUnit * item.quantity);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'Percentage') {
      return Math.round((subtotal * appliedCoupon.discount) / 100);
    } else {
      return appliedCoupon.discount;
    }
  }, [appliedCoupon, subtotal]);

  const shippingFee = subtotal - discountAmount > 400 ? 0 : 25;
  const insuranceFee = 8;
  const totalDue = Math.max(0, subtotal - discountAmount + shippingFee + insuranceFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const typedCode = couponCodeInput.trim().toUpperCase();
    if (!typedCode) return;

    const matched = coupons.find(c => c.code === typedCode);
    if (!matched) {
      setCouponError('Invalid coupon code.');
      setAppliedCoupon(null);
    } else if (!matched.active) {
      setCouponError('This coupon is currently inactive.');
      setAppliedCoupon(null);
    } else {
      setAppliedCoupon(matched);
      setCouponError('');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError('');
  };

  // Active success order info
  const [placedOrderInfo, setPlacedOrderInfo] = useState<{ id: string; trackingCode?: string } | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const finalized = placeOrder({ fullName, street, city, postalCode, country }, totalDue);
      if (appliedCoupon) {
        incrementCouponUsage(appliedCoupon.code);
      }
      setPlacedOrderInfo({ id: finalized.id, trackingCode: finalized.trackingCode });
      setPlacedOrder(finalized);
      setStep(3);
    }
  };

  const handleDashboardRedirect = () => {
    setActivePage('dashboard');
  };

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* CHECKOUT STEPS STEERING HEADER */}
        <div className="flex justify-between items-center mb-12 max-w-lg mx-auto">
          {[
            { tag: 1, label: 'Delivery Coordinates', icon: Truck },
            { tag: 2, label: 'Secured Payment', icon: CreditCard },
            { tag: 3, label: 'Allocation Confirmed', icon: Sparkles }
          ].map((st) => (
            <div key={st.tag} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                step >= st.tag 
                  ? 'bg-amber-500 border-amber-500 text-neutral-950 font-bold' 
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
              }`}>
                <st.icon size={16} />
              </div>
              <span className={`text-[9px] uppercase tracking-wider font-mono mt-2 text-center select-none ${
                step === st.tag ? 'text-amber-500 font-bold' : 'text-neutral-400'
              }`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: SHIPPING ADDRESS COORDINATES */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Address Form left */}
            <form onSubmit={handleNextStep} className="md:col-span-7 bg-stone-50 dark:bg-neutral-900/15 border border-neutral-150 dark:border-neutral-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-neutral-200/50 dark:border-neutral-800 pb-3 mb-2">
                <Truck size={16} className="text-amber-500" />
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Delivery Coordinates</h3>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street and house number"
                  className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-6 rounded bg-neutral-950 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to secured billing</span>
                <ArrowRight size={13} />
              </button>
            </form>

            {/* Receipt Summary right Column */}
            <div className="md:col-span-5 bg-stone-50 dark:bg-neutral-900/10 border border-neutral-100 dark:border-neutral-900 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">Your Selection</h4>
              
              <div className="divide-y divide-neutral-100 dark:divide-neutral-900 max-h-48 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-serif font-bold text-neutral-950 dark:text-white">{item.product.name}</span>
                      <span className="text-[10px] text-neutral-400 block font-mono">{item.size}ml decant &times; {item.quantity}</span>
                    </div>
                    <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(item.product.price) * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* E-Commerce Coupon Entry Panel */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 block">Promo Coupon</span>
                {appliedCoupon ? (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-between text-xs font-mono animate-fade-in">
                    <div className="flex items-center space-x-1.5">
                      <Sparkles size={11} className="text-emerald-500" />
                      <span className="font-bold">{appliedCoupon.code} (-{appliedCoupon.discount}{appliedCoupon.type === 'Percentage' ? '%' : '$'})</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveCoupon}
                      className="text-[9px] uppercase font-bold text-neutral-510 hover:text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter code e.g. FRAGG20"
                      value={couponCodeInput}
                      onChange={e => setCouponCodeInput(e.target.value)}
                      className="flex-1 text-xs px-2.5 py-1.5 rounded border border-neutral-250 dark:border-neutral-850 bg-white dark:bg-black text-neutral-955 dark:text-white uppercase placeholder:normal-case font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button 
                      type="submit" 
                      className="px-3 bg-neutral-950 hover:bg-amber-500 dark:bg-white dark:hover:bg-amber-500 text-white hover:text-neutral-950 dark:text-black hover:dark:text-neutral-950 text-[10px] font-mono uppercase font-bold rounded transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[10px] font-mono text-red-500">{couponError}</p>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 text-xs text-neutral-500 space-y-2">
                <div className="flex justify-between">
                  <span>Product total</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-mono">
                    <span>Campaign Discount</span>
                    <span>-{currencySymbol}{convertPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Freight transport</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Wax seal certificate</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(insuranceFee)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-serif font-bold text-neutral-950 dark:text-white">Amount Due</span>
                  <span className="text-lg font-serif font-bold text-amber-500">{currencySymbol}{convertPrice(totalDue)} {currency}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SECURED BILLING SYSTEM */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Left payment info */}
            <form onSubmit={handleNextStep} className="md:col-span-7 bg-stone-50 dark:bg-neutral-900/15 border border-neutral-150 dark:border-neutral-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200/50 dark:border-neutral-800 pb-3 mb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} className="text-amber-500" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Payment Method</h3>
                </div>
                <div className="flex items-center space-x-1.5 py-1 px-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-[9px] uppercase tracking-wider font-mono text-amber-600 dark:text-amber-400">
                  <ShieldCheck size={10} />
                  <span>Secure 256-Bit SSL</span>
                </div>
              </div>

              {/* Gold Privilege Card slider */}
              <div 
                onClick={() => setUseGoldCard(!useGoldCard)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  useGoldCard 
                    ? 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-800 border-amber-400 text-neutral-950 shadow-lg' 
                    : 'bg-white dark:bg-black border-neutral-250 dark:border-neutral-800 text-neutral-500 hover:border-amber-500/40'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] uppercase tracking-widest font-mono font-bold ${useGoldCard ? 'text-black' : 'text-neutral-400'}`}>
                    Antoine De Bary Member Privilege
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${useGoldCard ? 'border-neutral-950' : 'border-neutral-300'}`}>
                    {useGoldCard && <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>}
                  </div>
                </div>
                <h4 className={`font-serif tracking-wider text-sm mt-1.5 font-bold ${useGoldCard ? 'text-black' : 'text-neutral-800 dark:text-neutral-200'}`}>
                  Maison Gold Private Invoice
                </h4>
                <p className="text-[10px] mt-1 opacity-80 leading-relaxed font-sans">
                  Invoice dispatched to registered attorney coordinates. Exclusive for inner circle elite accounts.
                </p>
              </div>

              {!useGoldCard ? (
                /* Card credentials */
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Debit/Credit Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        required
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full py-4 mt-6 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer font-serif"
              >
                <span>PAY AND INITIATE BLENDING</span>
                <Sparkles size={13} className="text-neutral-950 animate-spin" />
              </button>
            </form>

            {/* Delivery address Review Right Column */}
            <div className="md:col-span-5 bg-stone-50 dark:bg-neutral-900/10 border border-neutral-100 dark:border-neutral-900 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">Delivery Coordinates</h4>
              
              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 pb-3 border-b border-neutral-100 dark:border-neutral-900 leading-relaxed">
                <p className="font-serif font-bold text-neutral-900 dark:text-white">{fullName}</p>
                <p>{street}</p>
                <p>{city}, {postalCode}</p>
                <p>{country}</p>
              </div>

              <div className="pt-2 text-xs text-neutral-500 space-y-2">
                <div className="flex justify-between">
                  <span>Cart selection total</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-mono">
                    <span>Discount applied</span>
                    <span>-{currencySymbol}{convertPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Logistics and certificates</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(shippingFee + insuranceFee)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 font-serif font-bold">
                  <span className="text-neutral-950 dark:text-white">Investment due</span>
                  <span className="font-mono text-amber-500 font-bold">{currencySymbol}{convertPrice(totalDue)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: ALLOCATION CONFIRMED - GOLD SUCCESS ANIMATION */}
        {step === 3 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16 bg-neutral-950 border border-amber-500/25 text-white rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
          >
            {/* Elegant luxury vectors inside success card background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <CheckCircle size={52} className="text-amber-500 mx-auto mb-6 animate-bounce" />

            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white">
              Formula Allocation Sealed
            </h2>
            <div className="w-10 h-0.5 bg-amber-500 mx-auto my-4"></div>
            
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-8">
              Congratulations. Your premium raw mineral elements are being hand-blended inside our Paris chamber. A wax seal certificate has been stamped under identifier <span className="font-mono text-amber-400 font-bold">{placedOrderInfo?.id}</span>.
            </p>

            {/* Tracking detail block */}
            {placedOrderInfo?.trackingCode && (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl max-w-sm mx-auto mb-8 font-mono text-[11px] text-neutral-400">
                <p className="uppercase tracking-wider">FREIGHT TRACKING CODE</p>
                <p className="text-sm font-bold text-amber-500 mt-1">{placedOrderInfo.trackingCode}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowInvoicePopup(true)}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-all rounded shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Download PDF Invoice</span>
              </button>

              <button
                onClick={handleDashboardRedirect}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-widest transition-all rounded shadow-md cursor-pointer"
              >
                Enter Member Atelier
              </button>
            </div>
          </motion.div>
        )}

      </div>

      <InvoiceModal 
        order={placedOrder} 
        isOpen={showInvoicePopup} 
        onClose={() => setShowInvoicePopup(false)} 
      />
    </div>
  );
};
