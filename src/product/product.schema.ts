import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    
  @Prop({ unique: true })
  title: string;
  @Prop()
  description: string;

  @Prop({unique:true})
  id:string

  @Prop()
  type:string;

  @Prop()
  tag: [];
 
  @Prop()
  image:string;

  @Prop()
  price: string;

  @Prop()
  hashtag: [];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
