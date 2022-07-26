

import {productImages} from '../interfaces/productInterface';

export class ProductUpdateDto {
  title: string;
  description: string;
  type: string;
//   image:productImages[];
  image:productImages[];
  price: string;
  hashtag: Array<string>;
  _id: string;
  id: string;
  updateProduct?: boolean;
  colors: string[];
}
