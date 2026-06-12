import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, User, Sun, Moon, Sparkles, Menu, X, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    theme, 
    toggleTheme, 
    activePage, 
    setActivePage, 
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'All Perfumes', page: 'shop' as const, category: 'All' },
    { label: 'Uni Perfumes', page: 'shop' as const, category: 'Unisex' },
    { label: 'Women Perfumes', page: 'shop' as const, category: 'Women' },
    { label: 'Men Perfumes', page: 'shop' as const, category: 'Men' },
  ];

  const handleNavClick = (page: 'shop', category: string) => {
    setSelectedCategory(category);
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-100 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 dark:text-gray-100 hover:text-amber-500 transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Logo */}
          <div 
            onClick={() => { setActivePage('landing'); setSearchQuery(''); }}
            className="flex items-center cursor-pointer group"
          >
            <div className="text-xl sm:text-2xl font-serif tracking-[0.4em] uppercase font-bold text-neutral-950 dark:text-white transition-opacity group-hover:opacity-80">
              Fragg <span className="text-amber-500 font-black italic">Force</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.category)}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-amber-500 cursor-pointer ${
                  activePage === 'shop' && selectedCategory === item.category 
                    ? 'text-amber-500 font-bold border-b border-amber-500/50 pb-0.5'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setActivePage('tracking')}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-amber-500 cursor-pointer ${
                activePage === 'tracking' 
                  ? 'text-amber-500 font-bold border-b border-amber-500/50 pb-0.5'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Order Tracking
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-amber-500 cursor-pointer ${
                activePage === 'contact' 
                  ? 'text-amber-500 font-bold border-b border-amber-500/50 pb-0.5'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Actions panel */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Search toggler */}
            <div className="relative flex items-center">
              {showSearchInput && (
                <input
                  type="text"
                  placeholder="Search essences..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activePage !== 'shop') {
                      setActivePage('shop');
                    }
                  }}
                  autoFocus
                  className="mr-2 text-xs py-1.5 px-3 rounded-full border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 w-32 sm:w-48 transition-all"
                />
              )}
              <button
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors"
                title="Search"
              >
                <Search size={19} />
              </button>
            </div>

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR' | 'GBP' | 'PKR' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'OMR' | 'BHD' | 'CAD' | 'AUD' | 'INR'| 'CNY' | 'JPY' | )}
                className="bg-transparent text-[10px] font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 rounded-none px-2 py-1.5 cursor-pointer focus:outline-none transition-all mr-1 uppercase"
                title="Select Currency"
                id="currency-selector"
              >
                <option value="USD" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">USD ($)</option>
                <option value="EUR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">EUR (€)</option>
                <option value="GBP" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">GBP (£)</option>
                <option value="PKR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">PKR (₨)</option>
                <option value="AED" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">AED (د.إ)</option>
                <option value="SAR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">SAR (﷼)</option>
                <option value="QAR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">QAR (ر.ق)</option>
                <option value="KWD" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">KWD (د.ك)</option>
                <option value="OMR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">OMR (ر.ع.)</option>
                <option value="BHD" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">BHD (ب.د)</option>
                <option value="CAD" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">CAD (C$)</option>
                <option value="AUD" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">AUD (A$)</option>
                <option value="INR" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">INR (₹)</option>
                <option value="CNY" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">CNY (¥)</option>
                <option value="JPY" className="bg-white dark:bg-black text-neutral-905 dark:text-neutral-50 h-8">JPY (¥)</option>
              </select>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors rounded-full"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActivePage('dashboard')}
              className="relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors"
              title="Wishlist"
            >
              <Heart size={19} className={wishlist.length > 0 ? 'fill-amber-500 text-amber-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setActivePage('cart')}
              className="relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-neutral-900 dark:bg-amber-500 text-[9px] font-bold text-white dark:text-neutral-950 text-center leading-4 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Dashboard */}
            <button
              onClick={() => setActivePage('dashboard')}
              className={`p-2 transition-colors ${
                activePage === 'dashboard' 
                  ? 'text-amber-500' 
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-amber-500'
              }`}
              title="Member Atelier"
            >
              <User size={19} />
            </button>

            {/* Admin Console shortcut with gold key icon indicator */}
            <button
              onClick={() => setActivePage('admin')}
              className={`hidden sm:flex items-center space-x-1 p-1 px-2.5 rounded text-[10px] font-mono tracking-wider border transition-all ${
                activePage === 'admin' 
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/40' 
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-amber-500/40 hover:text-amber-500'
              }`}
              title="Admin Panel"
            >
              <ShieldAlert size={12} className="text-amber-500 animate-pulse" />
              <span>ADMIN</span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-neutral-900 px-4 pt-4 pb-6 space-y-4 shadow-lg transition-colors">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page, item.category)}
              className="block w-full text-left text-xs uppercase tracking-widest py-2 text-neutral-800 dark:text-neutral-200 hover:text-amber-500 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setActivePage('tracking'); setMobileMenuOpen(false); }}
            className="block w-full text-left text-xs uppercase tracking-widest py-2 text-neutral-800 dark:text-neutral-200 hover:text-amber-500 transition-colors"
          >
            Order Tracking
          </button>
          <button
            onClick={() => { setActivePage('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left text-xs uppercase tracking-widest py-2 text-neutral-800 dark:text-neutral-200 hover:text-amber-500 transition-colors"
          >
            Contact Us
          </button>
          <div className="pt-2 border-t border-gray-100 dark:border-neutral-900 flex items-center justify-between">
            <button
              onClick={() => { setActivePage('admin'); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-[11px] font-serif uppercase tracking-widest text-amber-500 py-1"
            >
              <ShieldAlert size={14} />
              <span>ADMIN</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
