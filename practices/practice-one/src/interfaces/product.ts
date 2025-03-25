/**
 * Represents the product data structure.
 */
export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IProductByCategory extends IProduct {
  categoryName: string;
}

export type IProductWithoutId = Omit<IProductByCategory, 'id'>;
