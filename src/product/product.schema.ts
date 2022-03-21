import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @Prop({ unique: true, index: 'text' })
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
// ProductSchema.index({ index: 'text' }, { unique: true });
