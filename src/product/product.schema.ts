import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { attributesInterface, categoriesInterface } from './dto/createProduct.dto';
import { categoriesInterface } from './dto/create-product.dto';
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
  affilateType: Array<string>;
}

export type ProductCategoriesDocument = ProductCategories & Document;
@Schema({ versionKey: false })
export class ProductCategories {
  @Prop({ unique: true })
  itemID: string;
  @Prop()
  categories: [categoriesInterface];
}
export const ProductCategoriesSchema =
  SchemaFactory.createForClass(ProductCategories);

export const ProductSchema = SchemaFactory.createForClass(Product);
