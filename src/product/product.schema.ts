import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { productImages } from './interfaces/productInterface';
export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @Prop()
  id: string;
  @Prop({ unique: true, index: 'text' })
  title: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop()
  images: Array<string>;
  @Prop()
  price: string;
  @Prop()
  hashtag: Array<string>;
  @Prop()
  amount: number;
  @Prop()
  categories: Array<string>;
  @Prop()
  AffilateType: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
