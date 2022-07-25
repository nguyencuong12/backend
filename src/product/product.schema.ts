import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { productImages } from './interfaces/productInterface';
export type ProductDocument = Product & Document;

@Schema({ versionKey: false,
})
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
  // image: Array<string>;
  image:Array<productImages>
  @Prop()
  price: string;
  @Prop()
  hashtag: Array<string>;
  @Prop()
  colors: Array<string>;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

