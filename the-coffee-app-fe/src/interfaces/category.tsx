import { Product } from './product';
export default interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface CategoryTypeDto {
  id?: string;
  name: string;
}
