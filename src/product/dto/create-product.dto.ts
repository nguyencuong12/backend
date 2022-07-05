export class ProductDto {
  title: string;
  description: string;
  type: string;

  image: string[];

  price: string;
  hashtag: Array<string>;
  _id: string;
  id: string;
  updateProduct?: boolean;
}
