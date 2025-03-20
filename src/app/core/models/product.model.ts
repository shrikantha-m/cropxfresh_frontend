export enum ProductCategory {
  VEGETABLES = 'Vegetables',
  LEAFY_VEGETABLES = 'Leafy Vegetables',
  FRUITS = 'Fruits',
  GRAINS = 'Grains',
  OTHERS = 'Others'
}

export enum MeasurementUnit {
  KG_BOX_25 = '25kg box',
  KG_BOX_50 = '50kg box',
  BUNDLE = 'bundle',
  KG = 'kg',
  PIECE = 'piece'
}

export interface ProductVariant {
  id?: number;
  size: string;
  price: number;
  quantity: number;
  measurementUnit: MeasurementUnit;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  basePrice: number;
  baseQuantity: number;
  measurementUnit: MeasurementUnit;
  variant?: string;
  variants?: ProductVariant[];
  image?: string;
  farmerId: number;
  status: 'available' | 'unavailable';
  createdAt?: Date;
  updatedAt?: Date;
}