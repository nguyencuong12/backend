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

import { ProductService } from './product.service';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
// interface propsType {
//   hashtag: string;
// }
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async fetchAllProduct(@Res() response) {
    const products = await this.productService.fetchAllProduct();
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Req() request,
    @Res() response,
    @Body() product: Product,
    @UploadedFile() file: any,
  ) {
    let base64 = Buffer.from(file.buffer).toString('base64');
    product.image = base64;
    const status = await this.productService.createProduct(product);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    console.log('CALL');
    const product = await this.productService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Delete(':id')
  async deleteProduct(@Res() response, @Param() params) {
    const status = await this.productService.deleteProduct(params.id);
    return response.status(HttpStatus.OK).json({ status: status });
  }
  @Put(':id')
  async updateProduct(@Res() response, @Body() request, @Param() params) {
    const updateRQ = request.body.updateField;
    const result = this.productService.updateProduct(params.id, updateRQ);
    return response.state(HttpStatus.OK).json({ status: result });

    // return response.state(HttpStatus.OK).json({ status: 'Ok' });
  }
}
