import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { productsData } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Star, ShieldAlert, CheckCircle, RefreshCcw, Landmark, Sparkles, MessageSquarePlus, Flame, Droplets, Shield, Lock, ThumbsUp } from 'lucide-react';
import { Review } from '../types';

export const ProductDetailsPage: React.FC = () => {
  const { 
    selectedProductId, 
    addToCart, 
    setActivePage, 
    recentlyViewed, 
    addToRecentlyViewed ,
    toggleWishlist,
    isInWishlist,
    currency,
    currencySymbol,
    convertPrice,
    orders,
    placeOrder
  } = useStore();

  const product = useMemo(() => {
    return productsData.find(p => p.id === selectedProductId) || productsData[0];
  }, [selectedProductId]);

  const [selectedSize, setSelectedSize] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ritual' | 'reviews'>('details');

  // Segmented & Persistent Reviews state by Product ID
  const [reviewsMap, setReviewsMap] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('ff_product_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse reviewsMap', e);
      }
    }
    
    // Default initial seed data mapped appropriately to corresponding products
    return {
      'p1': [
        {
          id: 'r1',
          user: 'Alexander V.',
          rating: 5,
          date: '2026-05-18',
          comment: 'Absolute masterpiece. Noir Majestic lasts over 12 hours on my coat and the projection is incredible. It smells like sheer power and wealth. | Occasion: Evening Affair',
          verified: true
        },
        {
          id: 'r4',
          user: 'Sophia L.',
          rating: 5,
          date: '2026-06-07',
          comment: 'Fast delivery and the unboxing experience was pure luxury! The textured box with gold wax seals feels like Chanel or Dior. A 5-star brand indeed. | Occasion: All-Day Signature',
          verified: true
        }
      ],
      'p2': [
        {
          id: 'r2',
          user: 'Isabella M.',
          rating: 5,
          date: '2026-05-24',
          comment: 'The rose in Oud Seraphic is so authentic and lush, not overly sweet. When it dries down to the rich oud and sandalwood, it feels deeply spiritual. | Occasion: Midnight Seduction',
          verified: true
        }
      ],
      'p3': [
        {
          id: 'r3',
          user: 'Marcus K.',
          rating: 4,
          date: '2026-06-01',
          comment: 'Blanc Crystalline is my daily signature for the office. Super clean and sharp, like crisp mountain air. Gets loads of compliments. | Occasion: Executive Boardroom',
          verified: true
        }
      ],
      'p4': [
        {
          id: 'r5',
          user: 'Julian S.',
          rating: 5,
          date: '2026-05-29',
          comment: 'Breathtaking oceanic vibe. Smells like a premium saltwater breeze with dry driftwood. Phenomenal longevity, projects beautifully. | Occasion: Summer Freshness',
          verified: true
        }
      ],
      'p5': [
        {
          id: 'r6',
          user: 'Diana S.',
          rating: 5,
          date: '2026-06-03',
          comment: 'Deeply comforting, creamy Mysore sandalwood. Smooth, warm and rich, perfect for colder nights. Truly imperial! | Occasion: Evening Affair',
          verified: true
        }
      ],
      'p6': [
        {
          id: 'r7',
          user: 'Evelyn P.',
          rating: 5,
          date: '2026-06-09',
          comment: 'The best jasmine fragrance in my collection. Incredibly lush, fresh, and slightly sweet but highly classy. Absolute elegance. | Occasion: All-Day Signature',
          verified: true
        }
      ]
    };
  });

  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('ff_product_reviews', JSON.stringify(reviewsMap));
  }, [reviewsMap]);

  // Current product's reviews
  const currentReviews = useMemo(() => {
    return reviewsMap[product.id] || [];
  }, [reviewsMap, product.id]);

  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerOccasion, setReviewerOccasion] = useState('All-Day Signature');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSimulationVerified, setIsSimulationVerified] = useState(false);

  // Check if customer is verified (has purchased this product)
  const hasPurchased = useMemo(() => {
    if (!orders) return false;
    return orders.some(order => 
      order.items?.some(item => item.product?.id === product.id)
    );
  }, [orders, product.id]);

  const isVerifiedCustomer = hasPurchased || isSimulationVerified;

  // Rating review statistics
  const stats = useMemo(() => {
    const total = currentReviews.length;
    if (total === 0) return { avg: '0.0', distribute: [0, 0, 0, 0, 0], total: 0 };
    const sum = currentReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);
    
    const counts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5 stars
    currentReviews.forEach(r => {
      const idx = Math.min(4, Math.max(0, Math.floor(r.rating) - 1));
      counts[idx]++;
    });
    // distribute stats: 5 down to 1 star
    const distribute = counts.reverse().map(c => total > 0 ? Math.round((c / total) * 100) : 0);
    return { avg, distribute, total };
  }, [currentReviews]);

  // Set default selected size to the lowest available for custom products, and update when active product shifts
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      addToRecentlyViewed(product.id);
    }
  }, [product]);

  // Pricing calculation
  const currentPrice = useMemo(() => {
    const basePrice = convertPrice(product.price);
    if (selectedSize === 50) return Math.round(basePrice * 0.75);
    if (selectedSize === 150) return Math.round(basePrice * 1.30);
    if (selectedSize === 250) return Math.round(basePrice * 1.95);
    return basePrice;
  }, [product, selectedSize, convertPrice]);

  // Related products recommendations
  const relatedProducts = useMemo(() => {
    return productsData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  // Recently viewed products mapped back to full objects
  const recentProducts = useMemo(() => {
    return recentlyViewed
      .map(id => productsData.find(p => p.id === id))
      .filter((p): p is typeof productsData[0] => !!p && p.id !== product.id)
      .slice(0, 4);
  }, [recentlyViewed, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedSize, quantity);
    setActivePage('cart');
  };

  const handleBuyOnWhatsApp = () => {
    const textMsg = encodeURIComponent(
      `Hello Fragg Force,\n\nI am interested in purchasing:\n\n` +
      `Product Name: ${product.name}\n` +
      `Brand: ${product.brand}\n` +
      `Decant Size: ${selectedSize} ml\n` +
      `Quantity: ${quantity}\n` +
      `Calculated Price: ${currencySymbol}${currentPrice} ${currency}\n\n` +
      `Please guide me through reserving my allocation.`
    );
    window.open(`https://wa.me/923233260083?text=${textMsg}`, '_blank');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      user: reviewerName,
      rating: reviewerRating,
      comment: `${reviewerComment} | Occasion: ${reviewerOccasion}`,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setReviewsMap(prev => {
      const existingReviews = prev[product.id] || [];
      return {
        ...prev,
        [product.id]: [newRev, ...existingReviews]
      };
    });

    setReviewerName('');
    setReviewerComment('');
    setReviewerRating(5);
    setReviewerOccasion('All-Day Signature');
    setShowReviewForm(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 5000);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-8 pb-3 border-b border-neutral-100 dark:border-neutral-900">
          <span className="hover:text-amber-500 cursor-pointer" onClick={() => setActivePage('landing')}>Maison</span>
          <span>/</span>
          <span className="hover:text-amber-500 cursor-pointer" onClick={() => setActivePage('shop')}>Collection</span>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100">{product.name}</span>
        </div>

        {/* Master Details Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* LEFT: ZOOMABLE IMAGE RACK */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-stone-50 dark:bg-neutral-950 overflow-hidden border border-neutral-100 dark:border-neutral-900 group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700"
              />
              {product.badge && (
                <span className="absolute top-6 left-6 text-[9px] uppercase tracking-widest font-mono font-bold bg-neutral-950 text-amber-400 border border-amber-500/30 px-3 py-1 rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
            
            {/* Ambient image guidelines annotation */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /> Insured Delivery Seals</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Landmark size={12} className="text-amber-500" /> Antoine de Bary Certified</span>
            </div>
          </div>

          {/* RIGHT: DETAILS, CONTROLS, PYRAMID NOTES */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-bold">
                  {product.brand}
                </span>
                <div className="flex justify-between items-start mt-1 gap-4">
                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                    {product.name}
                  </h1>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-full border transition-all ${
                      isFavorited 
                        ? 'border-red-500 bg-red-500/10 text-red-500' 
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-red-500 hover:scale-105'
                    }`}
                    title="Add to Wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>

                {/* Rating summary */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        size={13} 
                        className={`${s <= Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300 dark:text-neutral-700'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-serif font-bold text-neutral-900 dark:text-white">{product.rating}</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                    ({product.reviewsCount} Global Evaluations)
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-stone-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Maison Sillage Draft</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xs font-mono text-amber-500">{currencySymbol}</span>
                  <span className="text-2xl font-serif font-bold text-neutral-990 dark:text-white">{currentPrice}</span>
                  <span className="text-xs text-neutral-400 font-mono ml-1">{currency}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* OLFACTORY PYRAMID STRUCTURE */}
              <div className="p-5 border border-amber-500/15 bg-neutral-50/50 dark:bg-neutral-900/20 rounded-xl space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                  <h4 className="text-[10px] uppercase tracking-widest font-mono text-amber-600 dark:text-amber-400 font-bold">
                    Olfactory Chord Chemistry
                  </h4>
                </div>

                <div className="space-y-3">
                  {/* Top Notes */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center">
                      <Flame size={12} className="text-orange-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block font-bold">Top Notes: The First Impression</span>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5">{product.notes.top.join(', ')}</p>
                    </div>
                  </div>

                  {/* Heart Notes */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded bg-amber-500/10 flex items-center justify-center">
                      <Droplets size={12} className="text-amber-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block font-bold">Heart Notes: The Soul & Sillage</span>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5">{product.notes.heart.join(', ')}</p>
                    </div>
                  </div>

                  {/* Base Notes */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded bg-neutral-900 dark:bg-neutral-800 flex items-center justify-center">
                      <Shield size={12} className="text-amber-600" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block font-bold">Base Notes: The Long Anchor</span>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5">{product.notes.base.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizes choosing */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 block font-bold">
                  Decant Size selection
                </span>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setQuantity(1); }}
                      className={`flex-1 py-3 text-xs font-mono rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                      }`}
                    >
                      {size} ml
                    </button>
                  ))}
                </div>
              </div>

              {/* Decant Quality Warning parameters */}
              <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500 pb-2">
                <div className="p-3 bg-stone-50 dark:bg-neutral-900/30 rounded border border-neutral-100 dark:border-neutral-900">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-400">Diffusion Strength</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">{product.intensity} Impact</span>
                </div>
                <div className="p-3 bg-stone-50 dark:bg-neutral-900/30 rounded border border-neutral-100 dark:border-neutral-900">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-400">Survival Span</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">{product.longevity}</span>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="flex items-center space-x-4 pt-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 block font-bold">
                  Quantity
                </span>
                <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-white dark:bg-black">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-zinc-400 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono text-neutral-900 dark:text-white w-8 text-center bg-stone-50/40 dark:bg-neutral-900/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                    className="px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-zinc-400 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Core Action Buttons */}
            <div className="space-y-2 mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900">
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-widest uppercase hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Add To Cart</span>
                </button>
                <button
                  onClick={handleInstantBuy}
                  className="flex-1 py-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
                >
                  Pre-Order Direct
                </button>
              </div>

              <button
                onClick={handleBuyOnWhatsApp}
                className="w-full py-4 mt-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer transition"
              >
                <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.452 5.517 0 10.002-4.48 10.006-9.997.002-2.673-1.03-5.186-2.906-7.065C16.671 1.666 14.162.634 11.5.634c-5.524 0-10.015 4.48-10.02 9.998-.002 1.834.484 3.626 1.442 5.176l-.988 3.606 3.713-.974zm13.11-8.541c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.64.81-.79.99-.14.17-.29.2-.55.07-1.21-.6-2.06-1.07-2.88-2.48-.22-.38.22-.35.63-1.16.07-.14.03-.27-.02-.4-.05-.13-.41-.99-.56-1.35-.15-.36-.3-.3-.41-.31h-.35c-.12 0-.32.04-.49.23-.17.18-.64.63-.64 1.53s.66 1.77.75 1.89c.09.12 1.29 1.97 3.12 2.76.44.19.78.3 1.05.38.44.14.84.12 1.15.07.35-.05 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.17-.52-.3z"/>
                </svg>
                <span>Buy On WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

        {/* DETAILS/REVIEWS INTERACTIVE TAB SYSTEM */}
        <div className="mb-16">
          <div className="flex border-b border-neutral-100 dark:border-neutral-900 mb-6">
            {(['details', 'ritual', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-6 text-xs uppercase tracking-widest font-mono transition-colors ${
                  activeTab === tab 
                    ? 'border-b-2 border-amber-500 text-amber-500 font-bold'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {tab === 'details' ? 'Technical Specifications' : tab === 'ritual' ? 'The Olfactory Ritual' : `Client Evaluations (${currentReviews.length})`}
              </button>
            ))}
          </div>

          <div className="min-h-[160px] bg-stone-50/50 dark:bg-neutral-900/30 p-6 rounded-xl border border-neutral-100 dark:border-neutral-900">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">MAISON CLASSIFICATION</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">Extrait de Parfum Intense</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">PETAL ORIGIN</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">Grasse, France & Laotian Valleys</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">ORGANIC INGREDIENTS RATIO</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">94.8% Natural botanical concentrates</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">DIFFUSION TIME</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">{product.longevity} standard projection</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">PACKAGING BOX</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">Embossed linen case with hand gold leaf stamping</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-mono text-[10px] text-neutral-400">ALCOHOL BASE</span>
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">Deodorized sugar beet extract (99% pure)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ritual' && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl space-y-3 font-sans">
                <p>
                  To maximize sillage, mist onto vascular coordinates—temple nodes, wrist paths, and clavicle indentations. Spritz from at least 15cm distance.
                </p>
                <p>
                  Avoid friction after dispersion. Ribbing wrists together ruptures aromatic organic polymers, causing top notes to dissolve before their planned exposure cycle.
                </p>
                <p className="text-amber-500/80 font-serif italic">
                  *Store in temperature-locked spaces below 22°C out of direct solar rays to retain active oil longevity profiles.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {reviewSuccess && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-500 rounded-lg text-xs flex items-center gap-2">
                    <CheckCircle size={14} />
                    <span>Your evaluation was recorded! It is now being dispatched to our master blenders.</span>
                  </div>
                )}

                {/* Stars Breakdown Summary Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-neutral-50 dark:bg-black border border-neutral-250 dark:border-neutral-900 rounded-xl items-center">
                  <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-800 pb-4 md:pb-0 md:pr-6">
                    <span className="text-4xl sm:text-5xl font-serif font-black text-neutral-900 dark:text-white leading-none block">{stats.avg}</span>
                    <div className="flex justify-center md:justify-start text-amber-500 my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={16} 
                          className={`${s <= Math.round(Number(stats.avg)) ? 'fill-current' : 'text-neutral-200 dark:text-neutral-800'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-bold">
                      {stats.total} Secured Patron Appraisals
                    </span>
                  </div>
                  
                  <div className="md:col-span-8 space-y-2">
                    {stats.distribute.map((percentage, index) => {
                      const stars = 5 - index;
                      return (
                        <div key={stars} className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 gap-3">
                          <span className="w-3 text-right font-mono text-[10px]">{stars}</span>
                          <Star size={10} className="text-amber-500 fill-current" />
                          <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-amber-500 h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right font-mono text-[10px] text-neutral-400">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Verification Check & Action Block */}
                {!isVerifiedCustomer ? (
                  <div className="p-6 bg-stone-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-xl relative overflow-hidden text-center max-w-lg mx-auto space-y-4">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-neutral-200 dark:from-neutral-850 via-amber-500 to-neutral-200 dark:to-neutral-855"></div>
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mx-auto text-neutral-500 dark:text-neutral-400">
                      <Lock size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-amber-500 block font-black">Patron Validation Required</span>
                      <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-1">Verified appraisals only</h3>
                      <p className="text-[11px] text-neutral-550 dark:text-neutral-400 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                        To maintain sillage and concentration feedback integrity, writing reviews is restricted to customers who have ordered this fragrance decant.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                      <button
                        onClick={handleInstantBuy}
                        className="px-4 py-2.5 rounded bg-neutral-950 dark:bg-white text-white dark:text-black font-extrabold text-[10px] uppercase tracking-widest transition-all cursor-pointer border border-neutral-900 dark:border-neutral-100"
                      >
                        Sample Decant Direct Pre-Order
                      </button>
                      <button
                        onClick={() => setIsSimulationVerified(true)}
                        className="px-4 py-2.5 rounded border border-neutral-200 dark:border-neutral-850 bg-stone-100 dark:bg-neutral-900 text-neutral-750 dark:text-neutral-200 font-mono text-[9px] uppercase tracking-wider hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all cursor-pointer font-bold"
                      >
                        Simulate Verified Access
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Reviews Add Toggler */}
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100 dark:border-neutral-800">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-555 text-emerald-500 font-black flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded">
                        <CheckCircle size={11} className="fill-emerald-500/15" /> Appraised Patron Identity Verified
                      </span>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-600 font-bold cursor-pointer font-mono uppercase tracking-wider transition-colors"
                      >
                        <MessageSquarePlus size={14} />
                        <span>{showReviewForm ? 'Decline Form' : 'Document Appraisal'}</span>
                      </button>
                    </div>

                    {/* Interactive Review Form */}
                    {showReviewForm && (
                      <form onSubmit={handleAddReview} className="p-6 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 space-y-4 max-w-lg mx-auto">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-amber-500 font-black block">Appraisal Draft Document</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1 font-mono font-bold">Your Name</label>
                            <input
                              type="text"
                              required
                              value={reviewerName}
                              onChange={(e) => setReviewerName(e.target.value)}
                              placeholder="e.g. Lady Seraphina"
                              className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-850 rounded bg-stone-50 dark:bg-black focus:outline-none focus:border-amber-500 text-neutral-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1 font-mono font-bold">Sillage Occasion</label>
                            <select
                              value={reviewerOccasion}
                              onChange={(e) => setReviewerOccasion(e.target.value)}
                              className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-850 rounded bg-stone-50 dark:bg-black focus:outline-none focus:border-amber-500 text-neutral-900 dark:text-white font-mono font-bold"
                            >
                              <option value="All-Day Signature">All-Day Signature</option>
                              <option value="Evening Affair">Evening Affair</option>
                              <option value="Executive Boardroom">Executive Boardroom</option>
                              <option value="Midnight Seduction">Midnight Seduction</option>
                              <option value="Summer Freshness">Summer Freshness</option>
                            </select>
                          </div>
                        </div>

                        {/* Star Rating Interactive Selection Grid */}
                        <div className="py-2">
                          <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1.5 font-mono font-bold">Interactive Rating Scale</label>
                          <div className="flex space-x-1 items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setReviewerRating(s)}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(null)}
                                className="text-amber-500 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer"
                              >
                                <Star 
                                  size={24} 
                                  className={`${s <= (hoverRating !== null ? hoverRating : reviewerRating) ? 'fill-current text-amber-500' : 'text-neutral-300 dark:text-neutral-800'}`} 
                                />
                              </button>
                            ))}
                            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 ml-3 font-bold select-none bg-stone-100 dark:bg-stone-900/50 px-2 py-1 rounded">
                              {reviewerRating === 5 ? 'Supreme' : reviewerRating === 4 ? 'Luxe' : reviewerRating === 3 ? 'Moderate' : reviewerRating === 2 ? 'Lacks Sillage' : 'Dissolved'}
                            </span>
                          </div>
                        </div>

                        {/* Written Appraisal feedback */}
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1 font-mono font-bold">Appraisal Observation Statement</label>
                          <textarea
                            required
                            rows={4}
                            value={reviewerComment}
                            onChange={(e) => setReviewerComment(e.target.value)}
                            placeholder="Share your olfactory sillage observation details, note persistence, and drydown transitions..."
                            className="w-full text-xs py-2.5 px-3 border border-neutral-200 dark:border-neutral-850 rounded bg-stone-50 dark:bg-black focus:outline-none focus:border-amber-500 text-neutral-900 dark:text-white"
                          ></textarea>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-3 rounded bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white font-serif font-black italic text-xs uppercase tracking-widest transition-all cursor-pointer border border-neutral-900 dark:border-neutral-300"
                        >
                          Submit Formal Appraisal
                        </button>
                      </form>
                    )}
                  </>
                )}

                {/* Individual Review List Items */}
                <div className="space-y-4">
                  {currentReviews.length === 0 ? (
                    <p className="text-center text-xs font-mono text-neutral-400 py-8 uppercase tracking-widest">
                      No appraisals documented for this creation yet. Be the first to add yours!
                    </p>
                  ) : (
                    currentReviews.map((rev) => {
                      // parse details from comments (clean splitter occasion vs text)
                      const parts = rev.comment.split(' | Occasion: ');
                      const commentText = parts[0];
                      const occasion = parts[1] || '';

                      return (
                        <div key={rev.id} className="p-4 rounded-xl bg-stone-50/50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                              <span className="font-serif font-extrabold text-xs text-neutral-950 dark:text-white">{rev.user}</span>
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold flex items-center gap-1 border border-emerald-500/10">
                                <CheckCircle size={10} className="fill-emerald-500/55" /> VERIFIED PATRON
                              </span>
                              {occasion && (
                                <span className="text-[9px] font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-bold whitespace-nowrap uppercase tracking-wider border border-amber-500/15">
                                  🎯 {occasion}
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-neutral-400 font-mono">{rev.date}</span>
                          </div>
                          
                          <div className="flex text-amber-500 mb-2.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={11} className={`${s <= rev.rating ? 'fill-current' : 'text-neutral-200 dark:text-neutral-800'}`} />
                            ))}
                          </div>
                          
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">{commentText}</p>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white mb-6 tracking-wide pb-2 border-b border-neutral-100 dark:border-neutral-900">
              Related Olfactory Essences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED */}
        {recentProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white mb-6 tracking-wide pb-2 border-b border-neutral-100 dark:border-neutral-900">
              Recently Viewed Creations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {recentProducts.map((p) => {
                if (!p) return null;
                return (
                  <div 
                    key={p.id}
                    onClick={() => {
                      const { setSelectedProductId, setActivePage } = useStore();
                      setSelectedProductId(p.id);
                      setActivePage('product-details');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer bg-stone-50/50 dark:bg-neutral-900/40 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-900 p-3 flex flex-col items-center text-center hover:border-amber-500/20 transition-all"
                  >
                    <div className="w-20 h-20 bg-stone-100 dark:bg-black rounded-lg overflow-hidden mb-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 truncate w-full">{p.brand}</span>
                    <h4 className="font-serif text-xs font-bold text-neutral-900 dark:text-white truncate w-full">{p.name}</h4>
                    <span className="text-[11px] font-mono text-amber-500 font-bold mt-1">{currencySymbol}{convertPrice(p.price)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
