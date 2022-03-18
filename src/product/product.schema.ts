import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @Prop({ require: true, unique: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  type: string;
  @Prop()
  image: string;
  @Prop()
  price: string;
  @Prop()
  hashtag: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
