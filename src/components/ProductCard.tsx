import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActivePage, 
    setSelectedProductId,
    setQuickViewProduct,
    currency,
    currencySymbol,
    convertPrice
  } = useStore();

  const isFav = isInWishlist(product.id);

  const handleProductClick = () => {
    setSelectedProductId(product.id);
    setActivePage('product-details');
    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const badgeColor = (badge?: string) => {
    switch (badge) {
      case 'Best Seller': return 'from-neutral-900 to-amber-950 text-amber-400 border-amber-500/30';
      case 'Limited Edition': return 'from-amber-600 to-yellow-800 text-amber-100 border-amber-300/30';
      case 'New Arrival': return 'from-zinc-900 to-zinc-800 text-zinc-100 border-zinc-700/50';
      default: return 'from-amber-700 to-neutral-950 text-gold-300 border-amber-500';
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white dark:bg-black rounded-none border border-neutral-150 dark:border-neutral-900 p-4 transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_4px_24px_rgba(212,175,55,0.05)]"
    >
      {/* Badge & Favorite Button */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.badge && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono px-2.5 py-1 rounded-none bg-stone-100 dark:bg-neutral-950 text-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-sm font-bold">
            {product.badge}
          </span>
        )}
      </div>

      <button
        id={`fav-${product.id}`}
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
        className="absolute top-6 right-6 z-10 p-2.5 rounded-none bg-white/95 dark:bg-black/95 backdrop-blur-md border border-neutral-150 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 hover:border-amber-500 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Add to Wishlist"
      >
        <Heart size={13} className={`${isFav ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div 
        onClick={handleProductClick}
        className="relative w-full aspect-square bg-stone-50 dark:bg-neutral-950 rounded-none overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
        />
        
        {/* Animated Blackout Overlay on Hover with Elegant Action Buttons */}
        <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          <button
            id={`quick-add-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.sizes[0], 1);
            }}
            className="w-full py-2.5 rounded-none bg-neutral-950 text-white hover:bg-amber-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-1.5"
            title="Interactive Quick Add"
          >
            <ShoppingCart size={11} />
            <span>Quick Purchase</span>
          </button>
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2.5 rounded-none bg-white text-neutral-950 hover:bg-neutral-100 transition-all text-[10px] font-bold uppercase tracking-wider font-mono flex items-center justify-center border border-neutral-250"
            title="Detailed Quick View"
          >
            <Eye size={11} className="mr-1.5" />
            <span>Atelier View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 pt-4">
        {/* Brand */}
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-bold mb-1">
          {product.brand}
        </span>

        {/* Title */}
        <h3 
          onClick={handleProductClick}
          className="font-serif text-sm text-neutral-900 dark:text-neutral-100 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer font-bold tracking-tight transition-colors duration-300 min-h-[2.5rem] flex items-center leading-snug"
        >
          {product.name}
        </h3>

        {/* Notes Preview (Scent family tags) */}
        <div className="flex flex-wrap gap-1.5 my-2">
          {product.notes.top.slice(0, 2).map((scent, i) => (
            <span 
              key={i} 
              className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 bg-stone-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-900/60 px-2 py-0.5 rounded-none"
            >
              {scent}
            </span>
          ))}
          <span className="text-[9px] font-mono text-amber-650 dark:text-amber-400/90 bg-amber-500/10 dark:bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 rounded-none font-bold">
            {product.category}
          </span>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-150 dark:border-neutral-900">
          <div className="flex items-baseline space-x-0.5">
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">{currencySymbol}</span>
            <span className="text-sm font-serif font-bold text-neutral-900 dark:text-neutral-100">
              {convertPrice(product.price)}
            </span>
            <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 ml-1">
              {currency}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-stone-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-900 px-2 py-0.5 rounded-none">
            <Star size={9} className="fill-amber-500 text-amber-500" />
            <span className="text-[9px] font-serif font-bold text-neutral-800 dark:text-neutral-200">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
