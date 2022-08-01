import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
// import { Express } from 'express';

import path = require('path');
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';

import { diskStorage } from 'multer';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { productImages } from './interfaces/productInterface';
const { uuid } = require('uuidv4');

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async fetchAllProduct(@Res() response, @Query() query) {
    console.log('HOST', process.env.HOST);
    let fontPage: number = query.currentPage || 1;
    const products = await this.productService.fetchAllProduct(fontPage);
    // return response.status(HttpStatus.OK).json({ products });

    return response.status(HttpStatus.OK).json({ products: products });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // const filename: string = file.originalname;
          const filename = uuid();
          const extension = '.webp';
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async createProduct(
    @Res() response,
    @Body() product: ProductCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files) {
      console.log('FILES', files);
      let arr: productImages[] = [];
      files.forEach((element) => {
        arr.push({
          id: element.filename.split('.')[0],
          path: process.env.HOST + '/image/' + element.filename,
        });
      });
      product.image = arr;
    }
    // product.image = files;
    let hashTag = product.hashtag.toString().split(',');
    product.hashtag = hashTag;
    // product.id = uuid();
    let status = await this.productService.createProduct(product);
    return response.status(HttpStatus.OK).json({ message: status });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/update')
  @UseInterceptors(
    FilesInterceptor('imageUpdate', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname.split('.')[0];
          const extension: string = '.webp';
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async updateProduct(
    @Res() response,
    @Body() product: ProductUpdateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let arr = [];
    if (files) {
      console.log('FILES', files);
      // files.forEach((element) => {
      //   arr.push(process.env.HOST + '/image/' + element.filename);
      // });
      // product.image = arr;
    }
    let hashTagArray = product.hashtag.toString().split(',');
    product.hashtag = hashTagArray;
    const update = await this.productService.updateProduct(product, arr);
    // return response.status(HttpStatus.OK).json({ product: update });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('deleteImages')
  async deleteImagesProduct(@Res() response,@Body() body:{
    id:string,
    idImage:string
  }){
    const {id,idImage} = body;
    // let arr = ["string","string"]
   let result = await  this.productService.deleteImagesProduct(id,idImage);
   return response.status(HttpStatus.OK).json({ updateStatus:result });

  }

  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    const product = await this.productService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Post('/total-amount')
  async fetchTotalAmountProduct(@Res() res) {
    const amount = await this.productService.fetchTotalAmountProduct();
    return res.status(HttpStatus.OK).json({ total: amount.length });
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  async deleteProduct(@Res() response, @Query() query) {
    console.log('pamrams', query);
    let id: string = query.id;
    const status = await this.productService.deleteProduct(id);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  @Post('hot')
  async fetchHotProduct(@Res() response) {
    const products = await this.productService.fetchHotProduct();
    console.log('PRODUCT HOT', products);
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('best-sale')
  async fetchBestSaleProducts(@Res() response) {
    console.log('CALL !!');
    const products = await this.productService.fetchBestSaleProducts();
    return response.status(HttpStatus.OK).json({ products: products });
    // const products = await this.productService.fetchHotProduct();
    // console.log('PRODUCT HOT', products);
    // return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('feature')
  async fetchFeatureProduct(@Res() response) {
    const products = await this.productService.fetchFeatureProduct();
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('gas-anhkiet')
  async fetchGasAnhKiet(@Res() response) {
    const products = await this.productService.fetchProductsFromType(
      'gas-anhkiet',
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('bep-gas')
  async fetchBepGas(@Res() response) {
    const products = await this.productService.fetchProductsFromType('bep-gas');
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('day-gas')
  async fetchDayGas(@Res() response) {
    const products = await this.productService.fetchProductsFromType('day-gas');
    return response.status(HttpStatus.OK).json({ products: products });
  }

  @Post('cat/foods')
  async fetchFoodProducts(@Res() response, @Body() body) {
    const products = await this.productService.fetchFoodProducts(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }

  @Post('cat/vitamins')
  async fetchVitaminProduct(@Res() response, @Body() body) {
    const products = await this.productService.fetchVitamin(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('cat/breeds')
  async fetchCatBreeds(@Res() response, @Body() body) {
    const products = await this.productService.fetchCatBreeds(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }

  @Post('cat/seeds')
  async fetchCatSeeds(@Res() response, @Body() body) {
    const products = await this.productService.fetchCatSeeds(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('cat/pate')
  async fetchCatPate(@Res() response, @Body() body) {
    const products = await this.productService.fetchCatPate(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }

  @Post('cat/clothes')
  async fetchCatClothes(@Res() response, @Body() body) {
    const products = await this.productService.fetchCatClothes(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('cat/toys')
  async fetchCatToys(@Res() response, @Body() body) {
    const products = await this.productService.fetchToys(
      parseInt(body.currentPage),
    );
    return response.status(HttpStatus.OK).json({ products: products });
  }
  // async fetchFeatureProduct(@Res() response) {
  //   const products = await this.productService.fetchFeatureProduct();
  //   return response.status(HttpStatus.OK).json({ products: products });
  // }
}
