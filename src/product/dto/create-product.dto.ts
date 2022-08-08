import { productImages } from '../interfaces/productInterface';

export class ProductCreateDto {
  title: string;
  description: string;
  type: string;
  image: productImages[];
  price: string;
  hashtag: Array<string>;
  id: string;
  updateProduct?: boolean;
  colors: string[];
  categories?: string[];
}
