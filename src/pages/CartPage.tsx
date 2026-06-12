import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Trash2, Heart, ShieldCheck, Ticket, ArrowRight, CornerDownLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    setActivePage, 
    toggleWishlist, 
    isInWishlist,
    currency,
    currencySymbol,
    convertPrice,
    coupons,
    appliedCoupon,
    setAppliedCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  // Subtotal calculation (includes proportional molecular size adjustments)
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

  // Handle promo code values
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const codeUpper = couponCode.trim().toUpperCase();
    if (!codeUpper) return;

    const matched = coupons.find(c => c.code === codeUpper);
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
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'Percentage') {
      return Math.round((subtotal * appliedCoupon.discount) / 100);
    } else {
      return appliedCoupon.discount;
    }
  }, [appliedCoupon, subtotal]);

  // Shipping details
  const shippingFee = subtotal - discountAmount > 400 ? 0 : 25; // free with spend threshold
  const insuranceFee = 8; // standard luxury freight insurance
  const totalOrderValue = Math.max(0, subtotal - discountAmount + shippingFee + insuranceFee);

  const handleCheckoutRedirect = () => {
    if (cart.length === 0) return;
    setActivePage('checkout');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleScentSelector = () => {
    setActivePage('shop');
  };

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-amber-500 font-bold block">YOUR PRIVATE ALLOCATIONS</span>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Maison Atelier Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty state warning layout */
          <div className="text-center py-20 bg-stone-50/50 dark:bg-neutral-900/10 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 max-w-xl mx-auto space-y-5">
            <ShoppingBag size={42} className="text-neutral-300 dark:text-neutral-700 mx-auto animate-bounce" />
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">Your Cart is Silent</h3>
              <p className="text-xs text-neutral-400 mt-1">
                You have not selected any olfactory formulas for allocation. Browse the collections to add elite essences.
              </p>
            </div>
            <button
              onClick={handleScentSelector}
              className="px-8 py-3.5 rounded bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-widest uppercase hover:bg-amber-500 transition-colors"
            >
              Browse Anthology
            </button>
          </div>
        ) : (
          /* Core Cart UI Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side column: Item blocks */}
            <div className="lg:col-span-8 space-y-4">
              
              {cart.map((item, idx) => {
                const basePrice = item.product.price;
                let priceUnit = basePrice;
                if (item.size === 50) priceUnit = Math.round(basePrice * 0.75);
                if (item.size === 150) priceUnit = Math.round(basePrice * 1.30);
                if (item.size === 250) priceUnit = Math.round(basePrice * 1.95);

                const isFav = isInWishlist(item.product.id);

                return (
                  <div 
                    key={`${item.product.id}-${item.size}-${idx}`}
                    className="flex flex-col sm:flex-row bg-stone-50/20 dark:bg-neutral-900/20 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-900 p-5 gap-6 items-center"
                  >
                    
                    {/* Item Image area */}
                    <div className="w-24 h-24 bg-stone-100 dark:bg-black rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Mid information */}
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">{item.product.brand}</span>
                      <h3 className="font-serif text-base font-bold text-neutral-950 dark:text-white mt-0.5">{item.product.name}</h3>
                      <p className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded w-fit mx-auto sm:mx-0 mt-1.5 font-bold">
                        {item.size}ml Classic Decant
                      </p>

                      <div className="flex justify-center sm:justify-start space-x-4 mt-3">
                        <button
                          onClick={() => toggleWishlist(item.product.id)}
                          className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-400 hover:text-rose-500 transition-colors"
                        >
                          <Heart size={11} className={isFav ? 'fill-rose-500 text-rose-500' : ''} />
                          <span>{isFav ? 'In Wishlist' : 'Add to Wish'}</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
                        >
                          <Trash2 size={11} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Right side increments & price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-900">
                      
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded overflow-hidden bg-white dark:bg-black">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.size, item.quantity - 1)}
                          className="px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-mono text-neutral-900 dark:text-white w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.size, item.quantity + 1)}
                          className="px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 font-mono block">Item Subtotal</span>
                        <span className="font-serif font-bold text-neutral-950 dark:text-white">
                          {currencySymbol}{convertPrice(priceUnit * item.quantity)}
                        </span>
                        <span className="text-[9px] text-neutral-400 ml-1 font-mono">{currency}</span>
                      </div>

                    </div>

                  </div>
                );
              })}

              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-[11px] text-amber-600 dark:text-amber-400 flex items-center justify-between">
                <span>Allocations above {currencySymbol}{convertPrice(400)} receive zero freight-cost transport insurance.</span>
                <span className="font-serif font-bold">Complimentary</span>
              </div>

            </div>

            {/* Right side column: Subtotals summarize */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Promo Coupon Form */}
              <div className="p-5 bg-stone-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-900 rounded-2xl">
                <div className="flex items-center space-x-1.5 text-neutral-900 dark:text-white mb-3">
                  <Ticket size={14} className="text-amber-500" />
                  <h4 className="text-xs uppercase tracking-wider font-mono font-bold">Promotion Voucher</h4>
                </div>
                
                {appliedCoupon ? (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-between text-xs font-mono animate-fade-in">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold">{appliedCoupon.code} (-{appliedCoupon.discount}{appliedCoupon.type === 'Percentage' ? '%' : '$'})</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveCoupon}
                      className="text-[10px] uppercase font-bold text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FRAGG20, SAVE10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-black text-neutral-900 dark:text-white focus:outline-none placeholder-neutral-400 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[10px] text-red-500 mt-2 font-mono">{couponError}</p>
                )}
                
                <div className="mt-4 pt-3 border-t border-neutral-200/50 dark:border-neutral-800/80 text-[10px] text-neutral-400 font-mono space-y-1">
                  <span className="text-[9px] uppercase text-neutral-500 font-bold block mb-1">Active Coupon Campaigns:</span>
                  {coupons.filter(c => c.active).map(c => (
                    <p key={c.code}>• "{c.code}" &mdash; {c.discount}{c.type === 'Percentage' ? '%' : '$'} Active Benefit</p>
                  ))}
                  {coupons.filter(c => c.active).length === 0 && (
                    <p className="text-[10px] text-neutral-500 italic">No current campaigns available.</p>
                  )}
                </div>
              </div>

              {/* Cost Summary Box */}
              <div className="p-5 bg-stone-50/50 dark:bg-zinc-950/40 border border-neutral-100 dark:border-neutral-900 rounded-2xl space-y-4">
                <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono font-bold">
                  Allocation Summary
                </h4>

                <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>Product Subtotal</span>
                    <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-500 font-mono">
                      <span>Voucher Benefit ({appliedCoupon.discount}{appliedCoupon.type === 'Percentage' ? '%' : '$'})</span>
                      <span>-{currencySymbol}{convertPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Freight (Paris - Express Case)</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      {shippingFee === 0 ? 'Complimentary' : `${currencySymbol}${convertPrice(shippingFee)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Wax Seal certification insurance</span>
                    <span className="font-mono text-neutral-900 dark:text-white">{currencySymbol}{convertPrice(insuranceFee)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-neutral-950 dark:text-white text-sm">TOTAL INVESTMENT</span>
                  <div className="text-right">
                    <span className="text-xl font-serif font-extrabold text-amber-600 dark:text-amber-400">
                      {currencySymbol}{convertPrice(totalOrderValue)}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono ml-1">{currency}</span>
                  </div>
                </div>

                {/* Secure Checkout button */}
                <button
                  onClick={handleCheckoutRedirect}
                  className="w-full py-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SECURE LUXURY CHECKOUT</span>
                  <ArrowRight size={13} />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-neutral-400 uppercase font-mono">
                  <ShieldCheck size={12} className="text-amber-500" />
                  <span>256-Bit SSL Secured Private Invoices</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
