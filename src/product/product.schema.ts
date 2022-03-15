import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({})
  title: string;
  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  tag: [];

  @Prop()
  image: string;

  @Prop()
  price: string;

  @Prop()
  hashtag: [];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
