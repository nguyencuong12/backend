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
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async fetchAllProduct(@Res() response, @Query() query) {
    let fontPage: number = query.currentPage || 1;
    const products = await this.productService.fetchAllProduct(fontPage);
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
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
    //OLD VERSION !!!
    // let hashtagString: string = product.hashtag.toString();
    // let hashtagArray: Array<string> = hashtagString.split(' ');
    // console.log('HASHTAG', hashtagArray);
    // product.hashtag = hashtagArray;
    // let base64 = Buffer.from(file.buffer).toString('base64');
    // product.image = base64;
    //NEW VERSION
    if (file) {
      product.image = file.path;
    }
    console.log('PRODUCTS', product);
    return response.status(HttpStatus.OK).json({ message: product });
    // console.log('PRODUCT', product);

    // const status = await this.productService.createProduct(product);
    // return response.status(HttpStatus.OK).json({ status: status });
  }

  @Post('/update')
  @UseInterceptors(
    FileInterceptor('imageUpdate', {
      limits: { fieldSize: 25 * 1025 * 1024 },
    }),
  )
  async updateProduct(
    @Res() response,
    @Body() product: ProductDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      let base64 = Buffer.from(file.buffer).toString('base64');
      product.image = base64;
    }
    let hashtagString: string = product.hashtag.toString();
    // console.log('HASHTAGSTRING', hashtagString);
    let hashtagArray: Array<string> = hashtagString.split(' ');
    // console.log('hashtagArray', hashtagArray);
    // product.hashtag = hashtagArray;
    console.log('hashtagString', hashtagArray);

    product.hashtag = hashtagArray;
    const update = await this.productService.updateProduct(product);
    return response.status(HttpStatus.OK).json({ product: update });
  }

  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    const product = await this.productService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Delete()
  async deleteProduct(@Res() response, @Query() query) {
    console.log('pamrams', query);
    let id: string = query.id;
    const status = await this.productService.deleteProduct(id);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  @Post('hot/')
  async fetchHotProduct(@Res() response) {
    const products = await this.productService.fetchHotProduct();
    console.log('CALL', products);
    return response.status(HttpStatus.OK).json({ products: products });
  }
}
