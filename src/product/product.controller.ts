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
} from '@nestjs/common';
// import { Express } from 'express';

import path = require('path');
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/create-product.dto';
import { diskStorage } from 'multer';
const { uuid } = require('uuidv4');

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async fetchAllProduct(@Res() response, @Query() query) {
    let fontPage: number = query.currentPage || 1;
    const products = await this.productService.fetchAllProduct(fontPage);
    return response.status(HttpStatus.OK).json({ products });
  }
  @Post('')
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  async createProduct(
    @Res() response,
    @Body() product: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      let path = process.env.HOST + '/image/' + file.filename;
      product.image = path;
    }
    let hashTag = product.hashtag.toString().split(',');
    // let hashTag = product.hashtag
    //   .toString()
    //   .replace(/\s+/g, ' ')
    //   .trim()
    //   .split(' ');
    // result.split(' ');
    product.hashtag = hashTag;
    product.id = uuid();
    delete product._id;
    console.log('hash tag', product.hashtag);

    let status = await this.productService.createProduct(product);
    return response.status(HttpStatus.OK).json({ message: status });
  }

  @Post('/update')
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateProduct(
    @Res() response,
    @Body() product: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('File Update', product);
    if (file) {
      let path = process.env.HOST + '/image/' + file.filename;

      product.image = path;
    }
    let hashTagArray = product.hashtag.toString().split(',');
    product.hashtag = hashTagArray;

    const update = await this.productService.updateProduct(product);
    return response.status(HttpStatus.OK).json({ product: update });
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
  @Post('feature')
  async fetchFeatureProduct(@Res() response) {
    const products = await this.productService.fetchFeatureProduct();
    return response.status(HttpStatus.OK).json({ products: products });
  }
}
