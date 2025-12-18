
export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  imageUrl: string;
}

export interface Participant {
  shopId: string;
  shopName: string;
  quantity: number;
  contribution: number;
}

export interface Pool {
  id: string;
  productId: string;
  status: 'active' | 'completed' | 'delivered';
  currentQty: number;
  targetQty: number;
  deadline: string;
  dropPointId: string;
  dropPointName: string;
  participants: Participant[];
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
}

export interface UserStats {
  totalSaved: number;
  activePools: number;
  completedPools: number;
}
