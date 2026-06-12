export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Men' | 'Women' | 'Unisex';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  notes: ProductNotes;
  sizes: number[]; // in ml
  badge?: string;
  intensity: 'Light' | 'Moderate' | 'Intense';
  longevity: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: number; // in ml
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Order Placed' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Out For Delivery' | 'Delivered';
  address: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  trackingCode?: string;
  courierName?: string;
  estimatedDeliveryDate?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: Array<{
    id: string;
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'Percentage' | 'Flat USD';
  active: boolean;
  usage: number;
}
