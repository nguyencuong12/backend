import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';

import { ProductService } from './product.service';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async fetchAllProduct(@Res() response) {
    const products = await this.productService.fetchAllProduct();
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Res() response,
    @Body() product: Product,
    @UploadedFile() file: any,
  ) {
    console.log('FILE', file);
    let base64 = Buffer.from(file.buffer).toString('base64');
    product.image = base64;
    const status = await this.productService.createProduct(product);
    console.log('STATUS', status);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    const product = await this.productService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Delete(':id')
  async deleteProduct(@Res() response, @Param() params) {
    const status = await this.productService.deleteProduct(params.id);
    return response.status(HttpStatus.OK).json({ status: status });
  }
}
