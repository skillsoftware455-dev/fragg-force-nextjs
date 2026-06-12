import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { productsData } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { ShieldAlert, Star, Sparkles, RefreshCcw, ScrollText, Gift, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useStore();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const bestSellers = productsData.slice(0, 4);

  const handleShopNow = () => {
    setSelectedCategory('All');
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectGender = (gender: 'Men' | 'Women' | 'Unisex') => {
    setSelectedCategory(gender);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300">
      
      {/* SECTION 1: HERO (Bold Typography Luxury Perfume Showcase) */}
      <section className="relative min-h-[600px] lg:h-[650px] flex flex-col lg:flex-row border-b border-neutral-150 dark:border-neutral-900 bg-white dark:bg-black w-full overflow-hidden transition-colors duration-300">
        
        {/* Left: Narrative and Typography Brand */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-150 dark:border-neutral-900 bg-white dark:bg-black relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-amber-500 text-[10px] sm:text-[11px] tracking-[0.3em] font-bold uppercase font-mono">
              ANTOINE DE BARY • MAISON COUTURE
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[84px] font-black leading-[0.9] italic mb-6 tracking-tight text-neutral-950 dark:text-white">
              Olfactory <br />
              <span className="text-amber-500 font-extrabold">Art.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-light leading-relaxed mb-8 font-sans"
          >
            Every bottle is an unyielding symphony of rare oriental resins, freshly collected Grasse jasmine, and precious liquid metals. Experience fragrances crafted with Dior-level intensity and Apple-like simplistic harmony.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button 
              onClick={handleShopNow}
              className="px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] tracking-[0.2em] font-bold uppercase border border-neutral-950 dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer"
            >
              Shop the Anthology
            </button>
            <button 
              onClick={() => selectGender('Unisex')}
              className="px-8 py-3.5 border border-neutral-300 dark:border-neutral-800 text-[10px] tracking-[0.2em] font-bold uppercase text-neutral-800 dark:text-neutral-200 hover:border-neutral-950 dark:hover:border-white transition-all cursor-pointer"
            >
              Discover the Maison
            </button>
          </motion.div>

          {/* Quick Micro trust traits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-900 text-neutral-500 max-w-sm"
          >
            <div>
              <span className="block font-serif font-black text-neutral-950 dark:text-white text-lg">100%</span>
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Organic Sillage</span>
            </div>
            <div>
              <span className="block font-serif font-black text-neutral-950 dark:text-white text-lg">12h+</span>
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono">True Longevity</span>
            </div>
            <div>
              <span className="block font-serif font-black text-neutral-950 dark:text-white text-lg">Grasse</span>
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Sourced</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Accent and Geometric Perfume bottle signature */}
        <div className="w-full lg:w-1/2 bg-neutral-50 dark:bg-neutral-950/60 relative flex items-center justify-center overflow-hidden py-16 lg:py-0">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Glassmorphism Card Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 right-8 p-5 bg-white/40 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-neutral-800/45 rounded-sm shadow-xl z-20"
          >
            <div className="text-[9px] uppercase tracking-widest text-amber-500 font-bold font-mono">Masterpiece Blend</div>
            <div className="text-xs font-serif italic text-neutral-950 dark:text-neutral-100">Bergamot, Patchouli & Saffron</div>
          </motion.div>
          
          {/* Aesthetic Luxury Perfume Bottle Shape using dynamic model image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-56 h-[340px] bg-neutral-950 border border-amber-500/25 shadow-2xl flex flex-col items-center justify-between p-6 rounded-sm"
          >
            <div className="w-full h-px bg-amber-500/30"></div>
            
            <div className="w-full aspect-square overflow-hidden my-3 relative flex items-center justify-center rounded-sm">
              <img 
                src="/src/assets/images/noir_gold_1781291004847.jpg" 
                alt="Noir Majestic" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 duration-700 rounded-sm" 
              />
            </div>

            <div className="text-white font-serif text-lg tracking-[0.3em] text-center uppercase border-y border-amber-500/40 py-2.5 w-full">
              NOIR MAJESTIC
            </div>

            <div className="w-full h-px bg-amber-500/35"></div>
            <div className="absolute -top-6 w-16 h-8 bg-black border-t-2 border-amber-500"></div>
          </motion.div>
          
          {/* Texture Element */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[80px]"></div>
        </div>

      </section>

      {/* SECTION 2: GENDER CATEGORY SELECTION (Featured Collections Grid) */}
      <section className="bg-white dark:bg-black border-b border-neutral-150 dark:border-neutral-900 transition-colors duration-300">
        <div className="w-full">
          
          <div className="text-center max-w-xl mx-auto py-16 px-4">
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-amber-500 font-mono">
              The Curation of Senses
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black italic tracking-tight text-neutral-950 dark:text-white mt-3">
              The Anthology
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto my-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-neutral-150 dark:border-neutral-900">
            
            {/* Column 1: Men */}
            <div 
              onClick={() => selectGender('Men')}
              className="group cursor-pointer relative overflow-hidden h-[320px] border-r border-b md:border-b-0 border-neutral-150 dark:border-neutral-900 flex flex-col justify-between bg-stone-50 dark:bg-neutral-950"
            >
              {/* Background product image with fine opacity */}
              <img
                src="/src/assets/images/blanc_sport_1781291037768.jpg"
                alt="Homme Collection"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-35 dark:opacity-25 group-hover:opacity-5 transition-opacity duration-500 select-none pb-4"
              />
              {/* Active rollout slide on hover */}
              <div className="absolute inset-0 bg-neutral-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-between p-8 text-white z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-widest font-mono font-bold opacity-30">01</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-bold text-amber-500 font-semibold">STRENGTH & MYSTIQUE</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif italic font-black mb-1.5">Pour Homme</h3>
                  <p className="text-[9px] tracking-widest uppercase opacity-60 font-mono">Crisp Cedar, Vetiver & Coriander</p>
                </div>
              </div>
              {/* Static display shown when not hovered */}
              <div className="relative z-5 p-8 h-full flex flex-col justify-between text-neutral-950 dark:text-white group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[10.5px] tracking-widest font-mono font-bold text-neutral-400 dark:text-neutral-500">01</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-bold text-amber-650 dark:text-amber-400">Homme</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-black tracking-tight mb-1.5">Pour Homme</h3>
                  <p className="text-[9px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">The Sovereign Collection</p>
                </div>
              </div>
            </div>

            {/* Column 2: Women */}
            <div 
              onClick={() => selectGender('Women')}
              className="group cursor-pointer relative overflow-hidden h-[320px] border-r border-b md:border-b-0 border-neutral-150 dark:border-neutral-900 flex flex-col justify-between bg-stone-50 dark:bg-neutral-950"
            >
              <img
                src="/src/assets/images/rose_oud_1781291020362.jpg"
                alt="Women Collection"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-35 dark:opacity-25 group-hover:opacity-5 transition-opacity duration-500 select-none pb-4"
              />
              <div className="absolute inset-0 bg-neutral-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-between p-8 text-white z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-widest font-mono font-bold opacity-30">02</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-bold text-amber-500 font-semibold">ELEGANCE & GRACE</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif italic font-black mb-1.5">Pour Femme</h3>
                  <p className="text-[9px] tracking-widest uppercase opacity-60 font-mono font-medium">Midnight jasmine, sweet roses & vanilla</p>
                </div>
              </div>
              <div className="relative z-5 p-8 h-full flex flex-col justify-between text-neutral-950 dark:text-white group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[10.5px] tracking-widest font-mono font-bold text-neutral-400 dark:text-neutral-500">02</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-bold text-amber-655 dark:text-amber-400 font-medium">Femme</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-black tracking-tight mb-1.5">Pour Femme</h3>
                  <p className="text-[9px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">The Damask Flora Collection</p>
                </div>
              </div>
            </div>

            {/* Column 3: Unisex */}
            <div 
              onClick={() => selectGender('Unisex')}
              className="group cursor-pointer relative overflow-hidden h-[320px] border-r border-b md:border-b-0 border-neutral-150 dark:border-neutral-900 flex flex-col justify-between bg-stone-50 dark:bg-neutral-950"
            >
              <img
                src="/src/assets/images/rose_oud_1781291020362.jpg"
                alt="Unisex Collection"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-35 dark:opacity-25 group-hover:opacity-5 transition-opacity duration-500 select-none pb-4"
              />
              <div className="absolute inset-0 bg-neutral-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-between p-8 text-white z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-widest font-mono font-bold opacity-30">03</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-bold text-amber-500 font-semibold">BORDERLESS FORMULATION</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif italic font-black mb-1.5">Maison Unisex</h3>
                  <p className="text-[9px] tracking-widest uppercase opacity-60 font-mono font-medium">Laotian oud, sacred resin & ambergris</p>
                </div>
              </div>
              <div className="relative z-5 p-8 h-full flex flex-col justify-between text-neutral-950 dark:text-white group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[10.5px] tracking-widest font-mono font-bold text-neutral-400 dark:text-neutral-500">03</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-bold text-amber-655 dark:text-amber-400 font-medium">Maison</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-black tracking-tight mb-1.5">Maison Unisex</h3>
                  <p className="text-[9px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">The Celestial Formulation</p>
                </div>
              </div>
            </div>

            {/* Column 4: CTA Grid View Full Catalog */}
            <div 
              onClick={handleShopNow}
              className="w-full bg-neutral-950 p-8 flex flex-col justify-center items-center text-white text-center cursor-pointer h-[320px] transition-colors hover:bg-neutral-900 border-neutral-900 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="w-12 h-12 border border-amber-500 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 duration-300 z-10">
                <span className="text-amber-500 text-lg group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
              
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold font-mono text-stone-200 z-10">
                View Full <br/> Catalog
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: BEST SELLERS */}
      <section className="py-24 bg-white dark:bg-black px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-amber-500 font-bold block mb-1">
                Luxe Classics
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-neutral-900 dark:text-white">
                The Best Sellers <span className="text-amber-500 font-black">Anthology</span>
              </h2>
            </div>
            <button 
              onClick={handleShopNow}
              className="mt-4 sm:mt-0 text-[10px] text-neutral-950 dark:text-neutral-50 font-bold tracking-[0.2em] font-mono uppercase bg-transparent hover:text-amber-500 flex items-center gap-2 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 px-5 py-2.5 rounded-sm"
            >
              <span>Explore Anthology</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: LUXURY EXPERIENCE (Traits) */}
      <section className="py-20 bg-neutral-950 text-white border-t border-b border-amber-500/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center mx-auto md:mx-0">
                <Star size={18} className="text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-base tracking-wide text-white">
                100% Sourced Originals
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Directly curated in France. We preserve precious botanical oils under state-regulated temperature shields.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center mx-auto md:mx-0">
                <RefreshCcw size={18} className="text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-base tracking-wide text-white">
                12-Hour Active Drift
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Every elixir includes high-density ambergris extract, binding rich perfume layers to clothes and skin.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center mx-auto md:mx-0">
                <ScrollText size={18} className="text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-base tracking-wide text-white">
                Worldwide Concierge Shipping
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Insured express delivery from Paris to Tokyo. Wrapped inside temperature cushions to maintain vital essence.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center mx-auto md:mx-0">
                <Gift size={18} className="text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-base tracking-wide text-white">
                Custom Wax Seals & Luxury Box
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Each parcel features personalized hand-poured gold wax stamps containing individual blender certification.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section className="py-24 bg-stone-50/50 dark:bg-neutral-900/10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-amber-500 font-bold block mb-1">
              The Jury
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-neutral-950 dark:text-white">
              Testimonials from the <span className="text-amber-500 font-extrabold">Atelier</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-black border border-neutral-150 dark:border-neutral-900 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-500/20">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm italic text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed mb-6 font-light">
                "Finding a scent that lasts without overwhelming is rare. Fragg Force Noir Majestic is complex, moody, and commands deep respect in my board meetings. It feels uniquely tailored for individuals of absolute class."
              </p>
              <div className="flex items-center space-x-3 pb-2">
                <div className="w-10 h-10 rounded-full border border-amber-500/35 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-serif text-xs font-bold text-amber-600">
                  MC
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-neutral-900 dark:text-white">Count Maximillian C.</h4>
                  <p className="text-[9px] font-mono tracking-wider text-neutral-400">Verifiable Collector, Munich</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-black border border-neutral-150 dark:border-neutral-900 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-500/20">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm italic text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed mb-6 font-light">
                "The Laotian Oud and Raspberry notes in Oud Seraphic create an elite tension. It drydowns beautifully over 12 hours. Opening the box felt like receiving a custom gift from Dior or Chanel. Truly breathtaking experience!"
              </p>
              <div className="flex items-center space-x-3 pb-2">
                <div className="w-10 h-10 rounded-full border border-amber-500/35 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-serif text-xs font-bold text-amber-600">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-neutral-900 dark:text-white">Sophia Michelle</h4>
                  <p className="text-[9px] font-mono tracking-wider text-neutral-400">Perfume Director, Cannes</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-sm bg-white dark:bg-black border border-neutral-150 dark:border-neutral-900 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-500/20">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm italic text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed mb-6 font-light">
                "Blanc Crystalline has become my signature. Crisp mountain birch paired with frosted lime feels like taking an fresh morning breath in the Swiss Alps. Extremely aesthetic bottle and luxurious branding."
              </p>
              <div className="flex items-center space-x-3 pb-2">
                <div className="w-10 h-10 rounded-full border border-amber-500/35 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-serif text-xs font-bold text-amber-600">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-neutral-900 dark:text-white">Stefan K.</h4>
                  <p className="text-[9px] font-mono tracking-wider text-neutral-400">Creative Lead, Stockholm</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: ELEGANT NEWSLETTER (Atelier Subscription) */}
      <section className="py-24 bg-neutral-950 text-white relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 bg-stone-900/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] tracking-[0.3em] font-mono text-amber-500 uppercase font-bold block mb-1">
            ATELIER MEMBERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-white mb-4">
            Receive Private <span className="text-amber-500 font-extrabold">Allocations</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-8 font-light">
            Subscribe to receive priority notifications on Limited Edition decants, rare raw oil harvests, and private members-only scent releases. No spam, only luxury.
          </p>

          {subscribed ? (
            <div className="p-6 bg-amber-500/10 border border-amber-500/45 rounded-sm space-y-2">
              <Sparkles className="w-6 h-6 text-amber-400 mx-auto animate-bounce" />
              <p className="text-sm font-serif font-bold text-amber-400">Atelier Invitation Reserved</p>
              <p className="text-[11px] text-neutral-450 font-sans">
                A personal confirmation containing your 15% introductory code has been dispatched. Welcome to Fragg Force Royal.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); if (newsEmail) setSubscribed(true); }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center border border-neutral-800 dark:border-neutral-800 rounded-sm overflow-hidden bg-neutral-900/40 backdrop-blur-md"
            >
              <input
                type="email"
                placeholder="Enter email for private allocation..."
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
                className="flex-1 text-xs py-4 px-4 bg-transparent text-white focus:outline-none placeholder-neutral-500 font-sans font-medium"
              />
              <button
                type="submit"
                className="py-4 px-8 bg-white text-neutral-950 hover:bg-amber-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
              >
                Request Pass
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
