/* eslint-disable semi */
import IProduct from './product';

/**
 * Represents the product with category data structure.
 */
export default interface IProductByCategory extends IProduct {
  categoryName: string;
}
