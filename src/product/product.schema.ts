import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @Prop({ unique: true })
  id: string;
  @Prop({ unique: true, index: 'text' })
  title: string;
  @Prop()
  description: string;
  @Prop()
  type: string;
  @Prop()
  image: Array<string>;
  @Prop()
  price: string;
  @Prop()
  hashtag: Array<string>;
  @Prop()
  colors: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// ProductSchema.index({ index: 'text' }, { unique: true });
