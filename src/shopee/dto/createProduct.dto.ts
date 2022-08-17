// export class imageInterface {
//   catid: number;
//   display_name: string;
//   is_default_subcat: boolean;
//   no_sub: boolean;
// }
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

export class ShopeeCreateDto {
  title: string;
  description: string;
  itemid: string;
  shopid: string;
  shop_location: string;
  image: string;
  images: string[];
  stock: number;
  price: number;
  categories: [categoriesInterface];
  brand: string;
  discount: string;
  attributes: [attributesInterface];
  tag:string[];
  affilate:string;

}
