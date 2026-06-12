import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Star, ArrowUpRight, Flame, Shield, Droplets } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setActivePage, setSelectedProductId, currency, currencySymbol, convertPrice } = useStore();
  const [selectedSize, setSelectedSize] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  // Proportionate price modifier for larger sizes (with active currency conversion)
  const getModifiedPriceConverted = () => {
    const basePrice = convertPrice(quickViewProduct.price);
    if (selectedSize === 50) return Math.round(basePrice * 0.75);
    if (selectedSize === 150) return Math.round(basePrice * 1.3);
    if (selectedSize === 250) return Math.round(basePrice * 1.95);
    return basePrice;
  };

  const handleBuyNow = () => {
    // Add item & go direct to cart
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
    setActivePage('cart');
  };

  const handleDetailRedirect = () => {
    setSelectedProductId(quickViewProduct.id);
    setQuickViewProduct(null);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop with blur */}
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-neutral-150 dark:border-neutral-900 rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-none bg-stone-50 dark:bg-neutral-905 text-neutral-800 dark:text-neutral-200 hover:text-amber-500 hover:scale-105 active:scale-95 transition-all border border-neutral-200 dark:border-neutral-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={15} />
        </button>

        {/* Left Side: Dynamic Image Display */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-stone-50 dark:bg-neutral-950 p-6 flex items-center justify-center border-r border-neutral-150 dark:border-neutral-900">
          <div className="relative w-full h-full max-h-[360px] rounded-none overflow-hidden group border border-neutral-100 dark:border-neutral-900">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 select-none"
            />
            {/* Intensity badge tag inside image */}
            <span className="absolute bottom-4 left-4 bg-neutral-950/90 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-none font-bold">
              {quickViewProduct.intensity} Intensity
            </span>
          </div>
        </div>

        {/* Right Side: Luxury Controls */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh] md:max-h-[600px] bg-white dark:bg-zinc-950">
          <div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-550 uppercase font-bold">
              {quickViewProduct.brand}
            </span>
            <h2 className="text-2xl font-serif text-neutral-955 dark:text-white font-black italic tracking-tight mt-1 mb-2 font-bold">
              {quickViewProduct.name}
            </h2>

            {/* Ratings & Badge */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={11} 
                    className={`${s <= Math.floor(quickViewProduct.rating) ? 'fill-amber-500 text-amber-500' : 'text-neutral-300 dark:text-neutral-750'}`} 
                  />
                ))}
                <span className="text-[11px] font-mono font-bold text-neutral-800 dark:text-neutral-200 ml-1.5">
                  {quickViewProduct.rating}
                </span>
                <span className="text-[9.5px] text-neutral-400 font-mono">
                  ({quickViewProduct.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline space-x-2 mb-4 bg-stone-50 dark:bg-neutral-900/10 p-3.5 rounded-none border border-neutral-150 dark:border-neutral-900">
              <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold tracking-wider">Aroma Essence Value:</span>
              <span className="text-2xl font-serif font-black text-neutral-950 dark:text-white">
                {currencySymbol}{getModifiedPriceConverted()}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">{currency}</span>
            </div>

            {/* Interactive Notes Architecture */}
            <div className="mb-5 space-y-2.5">
              <h4 className="text-[9px] uppercase tracking-widest font-mono text-neutral-450 font-bold">
                Olfactory Notes Spectrum
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 border border-neutral-150 dark:border-zinc-800 rounded-none bg-stone-50 dark:bg-zinc-900/10 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Flame size={10} className="text-orange-400" />
                    <span className="text-[8.5px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Top</span>
                  </div>
                  <p className="text-[9px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
                    {quickViewProduct.notes.top.join(', ')}
                  </p>
                </div>

                <div className="p-2 border border-neutral-150 dark:border-zinc-800 rounded-none bg-stone-50 dark:bg-zinc-900/10 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Droplets size={10} className="text-amber-500" />
                    <span className="text-[8.5px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Heart</span>
                  </div>
                  <p className="text-[9px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
                    {quickViewProduct.notes.heart.join(', ')}
                  </p>
                </div>

                <div className="p-2 border border-neutral-150 dark:border-zinc-800 rounded-none bg-stone-50 dark:bg-zinc-900/10 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Shield size={10} className="text-amber-600" />
                    <span className="text-[8.5px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Base</span>
                  </div>
                  <p className="text-[9px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
                    {quickViewProduct.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-455 font-bold">
                  Select Decant Size
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {selectedSize}ml (Classic Spray)
                </span>
              </div>
              <div className="flex space-x-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 text-[10px] font-mono rounded-none border transition-all uppercase tracking-widest font-bold cursor-pointer ${
                      selectedSize === size
                        ? 'border-neutral-950 dark:border-white bg-neutral-955 dark:bg-white text-white dark:text-black font-extrabold shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-450'
                    }`}
                  >
                    {size} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity adjustment */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-450 font-bold">
                Quantity
              </span>
              <div className="flex items-center border border-neutral-150 dark:border-neutral-850 rounded-none overflow-hidden bg-white dark:bg-black">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 hover:bg-neutral-55 dark:hover:bg-neutral-900 text-neutral-600 dark:text-zinc-450 font-black text-xs cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono text-neutral-900 dark:text-white w-8 text-center bg-stone-50/50 dark:bg-neutral-900/10">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  className="px-3 py-1.5 hover:bg-neutral-55 dark:hover:bg-neutral-900 text-neutral-600 dark:text-zinc-450 font-black text-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Checkout Controls */}
          <div className="space-y-2 mt-auto border-t border-neutral-150 dark:border-neutral-900 pt-5">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, selectedSize, quantity);
                  setQuickViewProduct(null);
                }}
                className="flex-1 filter-gold py-3 px-3 rounded-none bg-neutral-950 text-white hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag size={12} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-3 rounded-none bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-[10px] tracking-widest uppercase transition-all shadow-sm cursor-pointer"
              >
                Instant Buy
              </button>
            </div>
            
            <button
              onClick={handleDetailRedirect}
              className="w-full flex items-center justify-center space-x-1 py-2 text-[9px] text-neutral-500 hover:text-amber-500 uppercase tracking-widest transition-colors font-bold"
            >
              <span>Explore Signature Ritual & Notes</span>
              <ArrowUpRight size={10} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
