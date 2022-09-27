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

  async getProductInShopeeAffilate(type: any, linkAffilate: any) {
    let data: any;
    switch (type) {
      case 'shopee': {
        let arrT1 = linkAffilate.split('?');
        let arrT2 = arrT1[1].split('.');
        let shopID = arrT2[2];
        let itemID = arrT2[3].split('%')[0];
        if (isNaN(arrT2[2])) {
          shopID = arrT2[3];
          itemID = arrT2[4].split('%')[0];
        }
        data = await this.fetchShopee(shopID, itemID);
        break;
      }
      case 'tiki': {
        let originalLink = linkAffilate.split('.html');
        let productIDProcesss = linkAffilate.split('3D');
        let productID = productIDProcesss[productIDProcesss.length - 1];
        let shopID = originalLink[0].split('-p')[1];
        data = await this.fetchTiki(shopID, productID);
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
  async fetchShopee(shopID: string, itemID: string) {
    try {
      const res = await fetch(
        `https://shopee.vn/api/v4/item/get?itemid=${itemID}&shopid=${shopID}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            accept: '*/*',
            'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': 'c90d874e5521e97055639ca8104f3f83',
            'if-none-match-': '55b03-957e3d3e8f80452fe855d8fae46e8ff7',
            'sec-ch-ua':
              '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-api-source': 'pc',
            'x-requested-with': 'XMLHttpRequest',
            'x-shopee-language': 'vi',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
          method: 'GET',
          mode: 'cors',
          body: null,
        },
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('ERROR', error);
    }
  }
}
