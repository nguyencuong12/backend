import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { productImages } from './interfaces/productInterface';
export type ProductDocument = Product & Document;

@Schema({ versionKey: false,
})
export class Product {
  @Prop()
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
  @Prop()
  quality:Number;

}



export const ProductSchema = SchemaFactory.createForClass(Product);

