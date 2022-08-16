export class imageInterface {
  catid: number;
  display_name: string;
  is_default_subcat: boolean;
  no_sub: boolean;
}
export class attributesInterface {
  brand_option: string;
  id: number;
  is_timestamp: boolean;
  name: string;
  val_id: string;
  value: string;
}

export class ShopeeCreateDto {
  title: string;
  description: string;
  itemid: string;
  shopid: string;
  shop_location: string;
  image: string;
  images: [imageInterface];
  stock: number;
  price: number;
  categories: string[];
  brand: string;
  discount: string;
  attributes: [attributesInterface];
}
