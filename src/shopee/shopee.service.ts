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

@Injectable()
export class ShopeeService {
  constructor(
    @InjectModel(Shopee.name) private shopeeModel: Model<ShopeeDocument>,
    @InjectModel(ShopeeCategories.name)
    private shopeeCategoriesModel: Model<ShopeeCategoriesDocument>,
  ) // @InjectModel(Shopee.name) private shopeeModel: Model<ShopeeDocument>,

  {}
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
      console.log("ERR",err);
    }
  }

  async fetchProductsByTag(tag:string[])
  //EX: HOT , FEATURE , BEST SALE !!!!
  {
    try{
     return await this.shopeeModel.find({
        tag:{
          $all:tag
        }
      })
    }catch(err){
      throw err;
    }
  };

  async fetchProductByCategories(categories: string[]) {
    try {
      let _resultCategories:any = await this.shopeeCategoriesModel.find({
        'categories.display_name': {
          $all: categories,
        },
      });
      let _resultProductShopee = await this.shopeeModel.find({itemID:
          {
            $all:_resultCategories.itemID
          }
        });
      return _resultProductShopee;
    } catch (err) {}
  }
  async fetchProduct(id:string){
    try{
      let product = await this.shopeeModel.findOne({itemid:id});
      return product;

    }catch(err){

    }
  }
  async fetchAllProduct(){
    try{
     let products =  await this.shopeeModel.find();
     return products;
    }catch(err){}
  }
}
