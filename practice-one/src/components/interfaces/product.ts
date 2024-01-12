/**
 * Represents the product data structure.
 */
export interface IProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  categoryId: number;
}

export interface IProductByCategory extends IProduct {
  categoryName: string;
}
