import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../product/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async excuteSearch(searchField: string) {
    
    // let searchLow = searchField.toLowerCase();
    return await this.productModel
      .find({
        $or: [
          { title: { $regex: searchField, $options: 'i' } },
          { hashtag: { $regex: searchField, $options: 'i' } },
          {
            type: {
              $regex: searchField,
              $options: 'i',
            },
          },
        
        ],
      })
      .exec();
  }
}
