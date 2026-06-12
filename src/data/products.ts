import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 'p1',
    name: 'Noir Majestic',
    brand: 'Fragg Force Royal',
    category: 'Unisex',
    price: 320,
    rating: 4.9,
    reviewsCount: 142,
    description: 'A dark, magnetic exploration of precious wood, smoky incense, and warm gold leaf. Noir Majestic represents the zenith of contemporary luxury, designed for those who command presence without saying a word.',
    image: '/src/assets/images/noir_gold_1781291004847.jpg',
    notes: {
      top: ['Saffron', 'Black Pepper', 'Bergamot'],
      heart: ['Damask Rose', 'Incense', 'Amberwood'],
      base: ['Oud', 'Leather', 'Patchouli', 'Gold Musk']
    },
    sizes: [50, 100, 250],
    badge: 'Best Seller',
    intensity: 'Intense',
    longevity: '12-14 hours',
    stock: 24
  },
  {
    id: 'p2',
    name: 'Oud Seraphic',
    brand: 'Fragg Force Maison',
    category: 'Women',
    price: 295,
    rating: 4.8,
    reviewsCount: 96,
    description: 'An ethereal tapestry of pink Damascena rose woven with precious ancient oud from the Far East. Oud Seraphic captures the sublime tension between delicate floral petals and majestic, rich resinous wood.',
    image: '/src/assets/images/rose_oud_1781291020362.jpg',
    notes: {
      top: ['Cinnamon', 'Pink Pepper', 'Raspberry'],
      heart: ['Turkish Rose', 'Geranium', 'Jasmine'],
      base: ['Laotian Oud', 'Amber', 'Sandalwood', 'Vanilla Extract']
    },
    sizes: [50, 100],
    badge: 'Limited Edition',
    intensity: 'Intense',
    longevity: '8-12 hours',
    stock: 12
  },
  {
    id: 'p3',
    name: 'Blanc Crystalline',
    brand: 'Fragg Force Sport',
    category: 'Men',
    price: 240,
    rating: 4.7,
    reviewsCount: 88,
    description: 'A crisp, razor-sharp composition of frost-covered citrus, iced sage, and bright white silver birch. Blanc Crystalline is the ultimate standard for clean, premium athletic elegance.',
    image: '/src/assets/images/blanc_sport_1781291037768.jpg',
    notes: {
      top: ['Frosted Lime', 'Grapefruit', 'Ozone Accord'],
      heart: ['White Sage', 'Lavender', 'Ginger Roots'],
      base: ['Silver Birch', 'White Cedar', 'Vetiver', 'Clean Musk']
    },
    sizes: [50, 100, 150],
    badge: 'New Arrival',
    intensity: 'Light',
    longevity: '6-8 hours',
    stock: 35
  },
  {
    id: 'p4',
    name: 'Oceanic Abyssal',
    brand: 'Fragg Force Elements',
    category: 'Unisex',
    price: 275,
    rating: 4.9,
    reviewsCount: 115,
    description: 'A dramatic fragrance reminiscent of sapphire blue depths crashing against sun-burnt coastal stones. Packed with organic marine minerals, salty sea air, and dried golden driftwood.',
    image: '/src/assets/images/oceanic_mist_1781291061610.jpg',
    notes: {
      top: ['Ocean Spray', 'Sea Salt', 'Green Mandarin'],
      heart: ['Sea Kelp', 'Myrtle Leaf', 'Blue Chamomile'],
      base: ['Driftwood', 'Ambergris', 'Vetiver', 'Red Seaweed']
    },
    sizes: [50, 100],
    badge: 'Trending',
    intensity: 'Moderate',
    longevity: '8-10 hours',
    stock: 18
  },
  {
    id: 'p5',
    name: 'Santal Impérial',
    brand: 'Fragg Force Maison',
    category: 'Men',
    price: 310,
    rating: 4.8,
    reviewsCount: 74,
    description: 'A sumptuous, creamy tribute to pure East Indian sandalwood. Delicately cradled in warm cardamom, dry papyrus, and spicy coriander, creating a velvety second-skin luxury aroma.',
    image: '/src/assets/images/noir_gold_1781291004847.jpg', // Reuse Noir for dynamic variety or display beautifully
    notes: {
      top: ['Cardamom', 'Coriander Root', 'Violet Leaf'],
      heart: ['Iris Concrete', 'Papyrus', 'Leather Accord'],
      base: ['Mysore Sandalwood', 'Virginia Cedarwood', 'Amber']
    },
    sizes: [50, 100],
    badge: 'Classic',
    intensity: 'Intense',
    longevity: '10-12 hours',
    stock: 40
  },
  {
    id: 'p6',
    name: 'Jasmin Infini',
    brand: 'Fragg Force Royal',
    category: 'Women',
    price: 280,
    rating: 4.6,
    reviewsCount: 62,
    description: 'An infinite field of midnight-blooming Grasse jasmine. Its deep, rich white floral nectar is lightened by sun-warmed orange blossoms and grounded with rare white ambergris.',
    image: '/src/assets/images/rose_oud_1781291020362.jpg',
    notes: {
      top: ['Neroli', 'Bergamot Essence', 'Pear'],
      heart: ['Royal Jasmine', 'Orange Blossom', 'Tuberose'],
      base: ['White Ambergris', 'Chantilly Vanilla', 'Musk']
    },
    sizes: [50, 100],
    badge: 'Popular',
    intensity: 'Moderate',
    longevity: '8-10 hours',
    stock: 15
  }
];

export const reviewsData = [
  {
    id: 'r1',
    user: 'Alexander V.',
    rating: 5,
    date: '2026-05-18',
    comment: 'Absolute masterpiece. Noir Majestic lasts over 12 hours on my coat and the projection is incredible. It smells like sheer power and wealth.',
    verified: true
  },
  {
    id: 'r2',
    user: 'Isabella M.',
    rating: 5,
    date: '2026-05-24',
    comment: 'The rose in Oud Seraphic is so authentic and lush, not overly sweet. When it dries down to the rich oud and sandalwood, it feels deeply spiritual.',
    verified: true
  },
  {
    id: 'r3',
    user: 'Marcus K.',
    rating: 4,
    date: '2026-06-01',
    comment: 'Blanc Crystalline is my daily signature for the office. Super clean and sharp, like crisp mountain air. Gets loads of compliments.',
    verified: true
  },
  {
    id: 'r4',
    user: 'Sophia L.',
    rating: 5,
    date: '2026-06-07',
    comment: 'Fast delivery and the unboxing experience was pure luxury! The textured box with gold wax seals feels like Chanel or Dior. A 5-star brand indeed.',
    verified: true
  }
];
