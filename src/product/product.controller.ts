import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  Param,
  Query,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
// import { Express } from 'express';
import fetch from 'node-fetch';

import path = require('path');
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';

import { diskStorage } from 'multer';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { productImages } from './interfaces/productInterface';
import { response } from 'express';
const { uuid } = require('uuidv4');

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  async fetchListProductDocument(@Res() response, @Query() query) {
    console.log('PARAM', query);
    const { page } = query;
    let result = await this.productService.fetchListProductDocument(page);
    response.status(HttpStatus.OK).json({ products: result });
  }
  @Post('')
  async getProductFromLinkAffilate(@Res() response, @Body() body) {
    const { type, linkAffilate } = body;
    let result = await this.productService.getProductInShopeeAffilate(
      type,
      linkAffilate,
    );
    response.status(HttpStatus.OK).json({ product: result });
  }
  @Post('/create')
  async createProductFromLinkAffilate(
    @Res() response,
    @Body() product: ProductCreateDto,
  ) {
    let result = await this.productService.createProductFromLinkAffilate(
      product,
    );
    return response.status(HttpStatus.OK).json({ product: result });
  }
}
