import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopeeCreateDto } from './dto/createProduct.dto';
import { Shopee, ShopeeDocument } from './shopee.schema';

@Injectable()
export class ShopeeService {
  constructor(
    @InjectModel(Shopee.name) private shopeeModel: Model<ShopeeDocument>,
  ) {}
  async createProductShopee(product: ShopeeCreateDto) {
    try {
      const newShopeeProduct = new this.shopeeModel(product);
      return newShopeeProduct.save();
    } catch (err) {}
  }
}
