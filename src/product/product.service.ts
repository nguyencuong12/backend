import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
// import { ProductDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { ProductCreateDto } from './dto/create-product.dto';
import { productImages } from './interfaces/productInterface';
import * as path from 'path';
import fetch from 'node-fetch';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getProductInShopeeAffilate(type: any, linkAffilate: String) {
    let data: any;
    switch (type) {
      case 'shopee': {
        break;
      }
      case 'tiki': {
        console.log('TIKI', linkAffilate);
        let originalLink = linkAffilate.split('.html');
        let productIDProcesss = linkAffilate.split('3D');
        //MAIN
        let productID = productIDProcesss[productIDProcesss.length - 1];
        let shopID = originalLink[0].split('-p')[1];
        //MAIN
        // this.fetchTiki(shopID, productID).then((result) => {
        //   data = result;
        // });
        data = await this.fetchTiki(shopID, productID);
        // return data;
        break;
      }
    }

    return data;
  }
  async fetchTiki(shopID: string, productID: string) {
    let link = `https://tiki.vn/api/v2/products/${shopID}?platform=web&spid=${productID}`;
    return await (
      await this.httpService.axiosRef.get(link)
    ).data;
  }
}
