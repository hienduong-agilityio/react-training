export interface IFormValue {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface IValidationMessages extends Omit<IFormValue, 'price'> {
  price: string;
}
