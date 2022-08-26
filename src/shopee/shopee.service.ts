import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopeeCreateDto } from './dto/createProduct.dto';
import {
  Shopee,
  ShopeeDocument,
  ShopeeCategories,
  ShopeeCategoriesDocument,
} from './shopee.schema';
import fetch from 'node-fetch';


@Injectable()
export class ShopeeService {
  constructor(
    @InjectModel(Shopee.name) private shopeeModel: Model<ShopeeDocument>,
    @InjectModel(ShopeeCategories.name)
    private shopeeCategoriesModel: Model<ShopeeCategoriesDocument>, // @InjectModel(Shopee.name) private shopeeModel: Model<ShopeeDocument>,
  ) {}
  async createProductShopee(product: ShopeeCreateDto) {
    try {
      const newShopeeProduct = await new this.shopeeModel(product);
      let categoriesObject = {
        itemID: product.itemid,
        categories: product.categories,
        // ...product.categories
      };
      const newShopeeCategories = await new this.shopeeCategoriesModel(
        categoriesObject,
      );

      await newShopeeCategories.save();
      return await newShopeeProduct.save();
    } catch (err) {
      console.log('ERR', err);
    }
  }

  async fetchProductsByTag(
    tag: string[], //EX: HOT , FEATURE , BEST SALE !!!!
  ) {
    try {
      return await this.shopeeModel.find({
        tag: {
          $all: tag,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async updateProductShopee(product: ShopeeCreateDto) {
    const filter = { itemid: product.itemid };
    const filterCategories = {itemID:product.itemid};
    const update = product;
    try {
      let productUpdate = await this.shopeeModel.findOneAndUpdate(
        filter,
        update,
      );
      let result =await this.shopeeCategoriesModel.findOne(
        filterCategories,
      );
      result.categories = product.categories;
      result.save();
     
      




      //  newShopeeCategories.save();

      return productUpdate;
    } catch (err) {}
  }
  async searchShopee(title: string) {
    try {
      let products = await this.shopeeModel.find({
        title: { $regex: title, $options: 'i' },
      });
    
      return products;
    } catch (err) {}
  }

  async deleteProductShopee(itemID: string) {
    try {
      await this.shopeeCategoriesModel.findOneAndDelete({ itemID: itemID });
      return await this.shopeeModel.findOneAndDelete({ itemid: itemID });
    } catch (err) {}
  }

  async getProductShopeeFromURL(shopID: string, itemID: string) {
    console.log('SHOPEID', shopID);
    console.log('ITEMID', itemID);
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
      // return response.status(HttpStatus.OK).json({ products: data });
    } catch (error) {
      console.error('ERROR', error);
    }
  }
  async fetchProductByCategories(categories: string[],currentPage:number) {
 
    try {
      let _resultCategories: any = await this.shopeeCategoriesModel.find({
        'categories.display_name': {
          $all: categories,
        },
      });
      // console.log("COUNT",_resultCategories.countDocuments());
      let arrItemID = [];
      _resultCategories.map((instance) => {
        arrItemID.push(instance.itemID);
      });

 
      const query =   this.shopeeModel.find({
        itemid: {
          $in: arrItemID,
        },
      });
      // const count 

      const amount  = await this.getAmountProductFromCategories(arrItemID);
      const page:number = currentPage;
      const limit:number = 4;
      const data = await  query.skip((page-1)* limit).limit(limit).exec();
      return {products:data,count:amount}
      // return _resultProductShopee;
    } catch (err) {}
  }

  async getAmountProductFromCategories(arrItemID:any){
    // let countCategories = 0 ;
    return await this.shopeeModel.find({
      itemid: {
        $in: arrItemID,
      },
    }).count();
    

  

  }
  
  async fetchProduct(id: string) {
    try {
      let product = await this.shopeeModel.findOne({ itemid: id });
      return product;
    } catch (err) {}
  }

  async fetchAllProduct(currentPage: number) {
    try {
      const query =  this.shopeeModel.find({ skip: 10, limit: 4 });
      const page: number = currentPage;
      const limit: number = 4;
      const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
      return {products:data,total:await this.shopeeModel.countDocuments()}
    } catch (err) {}
  }
}
