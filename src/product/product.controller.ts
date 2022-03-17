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
  async fetchAllProduct(@Res() response) {
    const products = await this.productService.fetchAllProduct();
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
    @UploadedFile() file: any,
  ) {
    console.log('FILE', file);

    product.image = file.filename;

    // console.log('FILE', file);
    // let base64 = Buffer.from(file.buffer).toString('base64');
    // product.image = base64;
    const status = await this.productService.createProduct(product);
    return response.status(HttpStatus.OK).json({ status: status });
  }

  @Post('/update')
  @UseInterceptors(FileInterceptor('imageUpdate'))
  async updateProduct(
    @Res() response,
    @Body() product: ProductDto,
    @UploadedFile() file: any,
  ) {
    console.log('PRODUCT', product);
  }

  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    console.log('CALL', params);
    const product = await this.productService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Delete(':id')
  async deleteProduct(@Res() response, @Param() params) {
    const status = await this.productService.deleteProduct(params.id);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  // @Put(':id')
  // // @UseInterceptors(FileInterceptor('image'))
  // async updateProduct(
  //   @Res() response,
  //   @Body() body,
  //   @Param('id') id: string,
  //   @UploadedFile() file: any,
  // ) {
  //   console.log('body', body);
  //   // const result = this.productService.updateProduct(params.id, updateRQ);
  //   // return response.state(HttpStatus.OK).json({ status: result });

  //   // return response.state(HttpStatus.OK).json({ status: 'Ok' });
  // }
}
