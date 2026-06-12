import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, Coupon } from '../types';
import { productsData } from '../data/products';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  profile: UserProfile;
  theme: 'light' | 'dark';
  activePage: 'landing' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'dashboard' | 'admin' | 'tracking' | 'contact';
  selectedProductId: string;
  searchQuery: string;
  selectedCategory: string;
  recentlyViewed: string[];
  quickViewProduct: Product | null;
  currency: 'USD' | 'EUR' | 'GBP';
  currencySymbol: string;
  
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setActivePage: (page: 'landing' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'dashboard' | 'admin' | 'tracking' | 'contact') => void;
  setSelectedProductId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP') => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  
  addToCart: (product: Product, size: number, quantity?: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateCartQty: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  placeOrder: (shippingAddress: { fullName: string; street: string; city: string; postalCode: string; country: string }, customTotal?: number) => Order;
  cancelOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  updateProfile: (updated: UserProfile) => void;
  addToRecentlyViewed: (productId: string) => void;
  
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (code: string, updated: Partial<Coupon>) => void;
  deleteCoupon: (code: string) => void;
  toggleCoupon: (code: string) => void;
  incrementCouponUsage: (code: string) => void;
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
}

const defaultProfile: UserProfile = {
  name: 'Lady Seraphina',
  email: 'digitalnova516@gmail.com',
  phone: '+1 (555) 888-9999',
  addresses: [
    {
      id: 'addr1',
      fullName: 'Lady Seraphina',
      street: '742 Rue du Faubourg Saint-Honoré',
      city: 'Paris',
      postalCode: '75008',
      country: 'France',
      isDefault: true
    },
    {
      id: 'addr2',
      fullName: 'Lady Seraphina',
      street: '15 Bond Street Apt 4B',
      city: 'New York',
      postalCode: '10012',
      country: 'United States',
      isDefault: false
    }
  ]
};

const EXCHANGE_RATES: Record<'USD' | 'EUR' | 'GBP', number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
};

const CURRENCY_SYMBOLS: Record<'USD' | 'EUR' | 'GBP', string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<'landing' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'dashboard' | 'admin' | 'tracking' | 'contact'>('landing');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>(() => {
    const saved = localStorage.getItem('ff_currency');
    return (saved as 'USD' | 'EUR' | 'GBP') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('ff_currency', currency);
  }, [currency]);

  const currencySymbol = CURRENCY_SYMBOLS[currency];

  const convertPrice = (usdPrice: number) => {
    return Math.round(usdPrice * EXCHANGE_RATES[currency]);
  };

  const formatPrice = (usdPrice: number) => {
    return `${currencySymbol}${convertPrice(usdPrice)}`;
  };
  const [selectedProductId, setSelectedProductId] = useState<string>('p1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Coupon store
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('ff_coupons');
    if (saved) return JSON.parse(saved);
    return [
      { code: 'FRAGG20', discount: 20, type: 'Percentage', active: true, usage: 45 },
      { code: 'SAVE10', discount: 10, type: 'Flat USD', active: true, usage: 112 },
      { code: 'WELCOMEMEMBER', discount: 15, type: 'Percentage', active: true, usage: 89 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ff_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Applied Coupon state (shared across CartPage and CheckoutPage)
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('ff_applied_coupon');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('ff_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('ff_applied_coupon');
    }
  }, [appliedCoupon]);

  // Core stores
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ff_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ff_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ff_orders');
    if (saved) return JSON.parse(saved);
    // Initial luxury orders seed
    const initialOrders: Order[] = [
      {
        id: 'ORD-98410',
        date: '2026-05-12',
        items: [
          {
            product: productsData[0],
            size: 100,
            quantity: 1
          }
        ],
        total: 320,
        status: 'Delivered',
        address: {
          fullName: 'Lady Seraphina',
          street: '742 Rue du Faubourg Saint-Honoré',
          city: 'Paris',
          postalCode: '75008',
          country: 'France'
        },
        trackingCode: 'FRAGG-98410-EU',
        courierName: 'DHL Express',
        estimatedDeliveryDate: '2026-05-17'
      },
      {
        id: 'ORD-77521',
        date: '2026-06-05',
        items: [
          {
            product: productsData[1],
            size: 100,
            quantity: 1
          }
        ],
        total: 295,
        status: 'Shipped',
        address: {
          fullName: 'Lady Seraphina',
          street: '742 Rue du Faubourg Saint-Honoré',
          city: 'Paris',
          postalCode: '75008',
          country: 'France'
        },
        trackingCode: 'FRAGG-77521-EU',
        courierName: 'FedEx',
        estimatedDeliveryDate: '2026-06-10'
      }
    ];
    return initialOrders;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ff_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ff_theme');
    return (saved as 'light' | 'dark') || 'dark'; // Luxe dark theme by default looks extraordinary
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('ff_recent');
    return saved ? JSON.parse(saved) : ['p1', 'p2'];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('ff_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ff_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ff_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ff_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('ff_theme', theme);
    // Apply styling to document element
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ff_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Cart operations
  const addToCart = (product: Product, size: number, quantity: number = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: number) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQty = (productId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently viewed
  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 5); // Keep top 5
    });
  };

  // Profile operations
  const updateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  // Coupon actions
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => {
      if (prev.some(c => c.code === coupon.code)) {
        return prev.map(c => c.code === coupon.code ? coupon : c);
      }
      return [...prev, coupon];
    });
  };

  const updateCoupon = (code: string, updated: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, ...updated } : c));
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const toggleCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const incrementCouponUsage = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, usage: c.usage + 1 } : c));
  };

  // Order Placement
  const placeOrder = (
    shippingAddress: { fullName: string; street: string; city: string; postalCode: string; country: string },
    customTotal?: number
  ) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 5);
    const estDateStr = estDate.toISOString().split('T')[0];
    
    const fallbackTotal = cart.reduce((acc, item) => {
      const basePrice = item.product.price;
      let priceUnit = basePrice;
      if (item.size === 50) priceUnit = Math.round(basePrice * 0.75);
      if (item.size === 150) priceUnit = Math.round(basePrice * 1.30);
      if (item.size === 250) priceUnit = Math.round(basePrice * 1.95);
      return acc + (priceUnit * item.quantity);
    }, 0) + 25 + 8; // standard shipping + insurance fallback

    const newOrder: Order = {
      id: `ORD-${randomNum}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: customTotal !== undefined ? customTotal : fallbackTotal,
      status: 'Order Placed',
      address: shippingAddress,
      trackingCode: `FRAGG-${randomNum}-EX`,
      courierName: 'DHL Express',
      estimatedDeliveryDate: estDateStr
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Order Placed' }; // Safe default
      }
      return order;
    }));
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, ...updates };
      }
      return order;
    }));
  };

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      orders,
      profile,
      theme,
      activePage,
      selectedProductId,
      searchQuery,
      selectedCategory,
      recentlyViewed,
      quickViewProduct,
      currency,
      currencySymbol,
      
      setTheme,
      toggleTheme,
      setActivePage,
      setSelectedProductId,
      setSearchQuery,
      setSelectedCategory,
      setQuickViewProduct,
      setCurrency,
      convertPrice,
      formatPrice,
      
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      
      toggleWishlist,
      isInWishlist,
      
      placeOrder,
      cancelOrder,
      updateOrder,
      updateProfile,
      addToRecentlyViewed,

      coupons,
      addCoupon,
      updateCoupon,
      deleteCoupon,
      toggleCoupon,
      incrementCouponUsage,
      appliedCoupon,
      setAppliedCoupon
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
