import { productImages } from '../interfaces/productInterface';

export class ProductCreateDto {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  images: Array<string>;
  price: string;
  hashtag: Array<string>;
  categories?: string[];
  brand: string;
}

// id: string;
// @Prop({ unique: true, index: 'text' })
// title: string;
// @Prop()
// description: string;
// @Prop()
// image: string;
// @Prop()
// images: Array<string>;
// @Prop()
// price: string;
// @Prop()
// hashtag: Array<string>;
// @Prop()
// amount: number;
// @Prop()
// categories: Array<string>;
// @Prop()
// type: Array<string>;
