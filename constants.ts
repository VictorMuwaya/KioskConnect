
import { Product, Shop, Pool } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Wheat Flour (10kg)',
    category: 'Grains',
    unit: 'Bale',
    retailPrice: 15.50,
    wholesalePrice: 11.20,
    minWholesaleQty: 50,
    imageUrl: 'https://picsum.photos/seed/flour/400/300'
  },
  {
    id: 'p2',
    name: 'Vegetable Cooking Oil (20L)',
    category: 'Oils',
    unit: 'Jerrycan',
    retailPrice: 42.00,
    wholesalePrice: 34.50,
    minWholesaleQty: 20,
    imageUrl: 'https://picsum.photos/seed/oil/400/300'
  },
  {
    id: 'p3',
    name: 'Laundry Detergent (5kg)',
    category: 'Household',
    unit: 'Carton',
    retailPrice: 8.90,
    wholesalePrice: 6.40,
    minWholesaleQty: 30,
    imageUrl: 'https://picsum.photos/seed/soap/400/300'
  },
  {
    id: 'p4',
    name: 'Long Grain Rice (25kg)',
    category: 'Grains',
    unit: 'Bag',
    retailPrice: 28.00,
    wholesalePrice: 22.10,
    minWholesaleQty: 40,
    imageUrl: 'https://picsum.photos/seed/rice/400/300'
  }
];

export const CURRENT_SHOP: Shop = {
  id: 's1',
  name: "Mama Sarah's Duka",
  owner: 'Sarah Kamau',
  location: 'Nairobi West, Estate A',
  coordinates: { lat: -1.2921, lng: 36.8219 }
};

export const MOCK_POOLS: Pool[] = [
  {
    id: 'pool1',
    productId: 'p1',
    status: 'active',
    currentQty: 32,
    targetQty: 50,
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    dropPointId: 's10',
    dropPointName: "Central Wholesale Hub",
    participants: [
      { shopId: 's2', shopName: 'Maina Groceries', quantity: 10, contribution: 112.00 },
      { shopId: 's3', shopName: 'Pwani Store', quantity: 22, contribution: 246.40 }
    ]
  },
  {
    id: 'pool2',
    productId: 'p2',
    status: 'active',
    currentQty: 18,
    targetQty: 20,
    deadline: new Date(Date.now() + 3600000 * 4).toISOString(),
    dropPointId: 's1',
    dropPointName: "Mama Sarah's Duka (Me)",
    participants: [
      { shopId: 's4', shopName: 'Unity Mini Mart', quantity: 5, contribution: 172.50 },
      { shopId: 's5', shopName: 'Quick Shop', quantity: 13, contribution: 448.50 }
    ]
  }
];
