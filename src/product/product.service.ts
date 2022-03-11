import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async fetchAllProduct(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
  async createProduct(product: Product) {
    try {
      const newProduct = new this.productModel(product);
      return await newProduct.save();
    } catch (err) {
      if (err.code === 11000) {
        return 'Dupplicate';
      }
    }
  }
  async fetchProduct(id: string) {
    //   console.log("ID",);

    try {
      return await this.productModel.findOne({ title: id }).exec();
    } catch (err) {
      // return "Don't find item !!"\
      console.log('ERR', err);
    }
  }
  async deleteProduct(id: string) {
    try {
      return await this.productModel.findByIdAndDelete(id).exec();
    } catch (err) {
      return "Can't delete !!";
    }
  }
}
