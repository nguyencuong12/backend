import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { attributesInterface, categoriesInterface } from './dto/createProduct.dto';

export type ShopeeDocument = Shopee & Document;
@Schema({ versionKey: false })
export class Shopee {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ unique: true })
  itemid: string;
  @Prop()
  shopid: string;
  @Prop()
  shop_location: string;
  @Prop()
  image: string;
  @Prop()
  images: string[];
  @Prop()
  stock: number;
  @Prop()
  price: number;
  @Prop()
  categories: string[];
  @Prop()
  brand: string;
  @Prop()
  discount: string;
  @Prop()
  attributes: [attributesInterface];
  @Prop()
  tag:string[];
  @Prop()
  affilate:string;
  
}

export type ShopeeCategoriesDocument = ShopeeCategories & Document;
@Schema({ versionKey: false })
export class ShopeeCategories {
  @Prop({unique:true})
  itemID:string;
  @Prop()
  categories:[categoriesInterface];
}

export const ShopeeCategoriesSchema = SchemaFactory.createForClass(ShopeeCategories);
export const ShopeeSchema = SchemaFactory.createForClass(Shopee);




