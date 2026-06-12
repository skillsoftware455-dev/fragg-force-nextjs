import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { productsData } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Grid, List, Search, SlidersHorizontal, ArrowUpDown, RefreshCcw, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    currency,
    currencySymbol,
    convertPrice
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(350); // upper limit
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating-desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Derive available brands and intensities for filters
  const brands = useMemo(() => {
    return ['All', ...new Set(productsData.map(p => p.brand))];
  }, []);

  const intensities = ['All', 'Light', 'Moderate', 'Intense'];

  // Handle resets
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange(350);
    setSelectedIntensity('All');
    setSortBy('rating-desc');
    setCurrentPage(1);
  };

  // Filter and Sort calculation
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Search query search
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.notes.top.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Category filters (Gender)
        const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;

        // Brand filters
        const matchBrand = selectedBrand === 'All' || product.brand === selectedBrand;

        // Price range
        const matchPrice = product.price <= priceRange;

        // Scent Intensity
        const matchIntensity = selectedIntensity === 'All' || product.intensity === selectedIntensity;

        return matchSearch && matchCategory && matchBrand && matchPrice && matchIntensity;
      })
      .sort((a, b) => {
        // Sort switch
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, selectedIntensity, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(begin, begin + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleProductCardClick = (productId: string) => {
    const { setSelectedProductId, setActivePage } = useStore();
    setSelectedProductId(productId);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-350 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero Area */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3 bg-stone-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-900 px-3.5 py-1 text-amber-500 text-[9px] font-mono tracking-[0.25em] uppercase font-bold">
            <Sparkles size={10} />
            <span>The Sensory Vault</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black italic tracking-tight text-neutral-955 dark:text-white">
            Collection <span className="text-amber-500 font-extrabold">Anthologies</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-400 font-sans mt-3 leading-relaxed font-light">
            Filter through our premium, raw ingredient extractions and find your distinct chemical signature. Crafted for individuals who express absolute luxury.
          </p>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FILTERS RACK */}
          <div className="lg:col-span-3 space-y-6 bg-white dark:bg-black p-6 rounded-none border border-neutral-150 dark:border-neutral-900 sticky top-24 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-150 dark:border-neutral-900">
              <div className="flex items-center space-x-2 text-neutral-950 dark:text-white font-mono font-bold text-xs uppercase tracking-wider">
                <SlidersHorizontal size={13} className="text-amber-500" />
                <span>Filters</span>
              </div>
              <button 
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[9px] uppercase font-mono tracking-widest text-amber-600 dark:text-amber-400 hover:opacity-80 cursor-pointer font-bold"
                title="Reset All Filters"
              >
                <RefreshCcw size={9} />
                <span>Reset</span>
              </button>
            </div>

            {/* Scent Line/Category (Men/Women/Unisex) */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">
                Olfactory Target
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-none text-[9px] font-mono uppercase tracking-widest transition-all border cursor-pointer font-bold ${
                      selectedCategory === cat 
                        ? 'bg-neutral-950 dark:bg-white text-white dark:text-black border-neutral-950 dark:border-white'
                        : 'bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">
                Maison Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
                className="w-full text-xs py-2.5 px-3 rounded-none border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>{b === 'All' ? 'All Luxury Brands' : b}</option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                <span>Maximum Price</span>
                <span className="text-amber-550 dark:text-amber-400 font-bold">{currencySymbol}{convertPrice(priceRange)} {currency}</span>
              </div>
              <input
                type="range"
                min="200"
                max="350"
                step="5"
                value={priceRange}
                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-amber-500 h-1 bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-neutral-400 font-mono">
                <span>{currencySymbol}{convertPrice(200)}</span>
                <span>{currencySymbol}{convertPrice(350)}</span>
              </div>
            </div>

            {/* Scent Intensity */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">
                Scent Intensity
              </label>
              <div className="flex flex-col space-y-1">
                {intensities.map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => { setSelectedIntensity(intensity); setCurrentPage(1); }}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-none font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedIntensity === intensity
                        ? 'bg-amber-500/10 text-amber-650 dark:text-amber-400 font-bold border-l-2 border-amber-500 pl-2'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 pl-2.5'
                    }`}
                  >
                    {intensity === 'All' ? 'All Intensities' : intensity}
                  </button>
                ))}
              </div>
            </div>

            {/* Organic Trust Banner */}
            <div className="p-4 bg-neutral-950 text-white rounded-none border border-amber-500/15 space-y-2">
              <h5 className="font-serif text-[11px] font-bold text-amber-400 tracking-wider font-extrabold italic">MEMBER PERKS</h5>
              <p className="text-[10px] text-neutral-300 font-sans leading-relaxed font-light">
                Enjoy complimentary insurance, customized hand-engraved bottles, and 3 premier travel decants with every purchase.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: SEARCH, RESULTS & GRID */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar line */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-black p-4 rounded-none border border-neutral-150 dark:border-neutral-900 shadow-sm">
              
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                <span className="font-serif font-black text-sm text-neutral-950 dark:text-white">
                  {filteredProducts.length}
                </span>
                <span>essences revealed</span>
              </div>

              {/* View/Sort Rack */}
              <div className="flex items-center justify-between sm:justify-end gap-5">
                
                {/* Sort dropdown */}
                <div className="flex items-center space-x-1.5">
                  <ArrowUpDown size={11} className="text-neutral-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-[9px] uppercase font-mono tracking-widest border-none bg-transparent hover:text-amber-500 focus:outline-none font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer"
                  >
                    <option value="rating-desc">Sort: Highest Rated</option>
                    <option value="price-asc">Sort: Price: Low to High</option>
                    <option value="price-desc">Sort: Price: High to Low</option>
                    <option value="name-asc">Sort: Alphabetical (A-Z)</option>
                  </select>
                </div>

                {/* Grid vs List view toggle */}
                <div className="hidden sm:flex items-center space-x-1 border-l border-neutral-200 dark:border-neutral-800 pl-4">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-none transition-colors cursor-pointer ${
                      viewMode === 'grid' 
                        ? 'bg-neutral-100 dark:bg-neutral-900 text-amber-500' 
                        : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                    title="Grid View"
                  >
                    <Grid size={13} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-none transition-colors cursor-pointer ${
                      viewMode === 'list' 
                        ? 'bg-neutral-100 dark:bg-neutral-900 text-amber-500' 
                        : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                    title="List View"
                  >
                    <List size={13} />
                  </button>
                </div>

              </div>

            </div>

            {/* Zero Results Warning */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white dark:bg-black rounded-none border border-neutral-150 dark:border-neutral-900">
                <Search size={28} className="text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                <h3 className="font-serif text-lg font-black italic text-neutral-900 dark:text-white">Olfactory Spectrum Silent</h3>
                <p className="text-xs text-neutral-400 mt-2 mb-6 font-light max-w-sm mx-auto leading-relaxed">
                  No luxury perfumes match your selected filtering variables. Try shifting the ranges or reset filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 rounded-none bg-neutral-950 text-white font-mono font-bold text-[9px] tracking-widest uppercase hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

            {/* Products Array */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleProductCardClick(product.id)}
                    className="flex flex-col sm:flex-row bg-white dark:bg-black rounded-none overflow-hidden border border-neutral-150 dark:border-neutral-900 p-4 gap-6 cursor-pointer hover:border-amber-500/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-full sm:w-40 aspect-square bg-stone-50 dark:bg-neutral-950 rounded-none overflow-hidden flex-shrink-0 border border-neutral-100 dark:border-neutral-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold">{product.brand}</span>
                        <h3 className="font-serif text-lg font-black tracking-tight text-neutral-950 dark:text-white mt-1">{product.name}</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-2 line-clamp-2 leading-relaxed font-light">{product.description}</p>
                        
                        {/* Notes list */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {product.notes.top.map((n, i) => (
                            <span key={i} className="text-[9px] font-mono text-neutral-550 dark:text-neutral-400 bg-stone-50 dark:bg-neutral-905 border border-neutral-150/60 dark:border-neutral-900 px-2 py-0.5 rounded-none">{n}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-150 dark:border-neutral-900">
                        <div className="flex items-baseline space-x-0.5">
                          <span className="text-[10px] font-mono text-amber-600">{currencySymbol}</span>
                          <span className="text-base font-serif font-black text-neutral-900 dark:text-white">{convertPrice(product.price)}</span>
                          <span className="text-[9px] font-mono text-neutral-400 ml-1">{currency}</span>
                        </div>
                        <span className="text-[9px] font-mono uppercase text-amber-600 dark:text-amber-400 tracking-[0.15em] hover:underline font-bold">
                          Explore Signature Ritual &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-12">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-none border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 disabled:opacity-45 hover:border-neutral-950 dark:hover:border-white transition-colors cursor-pointer"
                >
                  &larr; Prev
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const pNum = index + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`w-10 h-10 text-[10px] rounded-none border font-mono transition-all cursor-pointer ${
                        currentPage === pNum
                          ? 'border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-black font-extrabold'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-none border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 disabled:opacity-45 hover:border-neutral-950 dark:hover:border-white transition-colors cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
