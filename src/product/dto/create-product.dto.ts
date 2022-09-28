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
  categories?: [categoriesInterface];
  attributes?: [attributesInterface];
  brand: string;
  affilateType:[];
}
export class attributesInterface {
  brand_option: string;
  id: number;
  is_timestamp: boolean;
  name: string;
  val_id: string;
  value: string;
}
export class categoriesInterface{
  catid:number;
  display_name:string;
  no_sub:boolean;
  is_default_subcat:boolean;
}
