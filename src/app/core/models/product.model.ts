export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  farmerId: number;
  status: 'available' | 'unavailable';
}