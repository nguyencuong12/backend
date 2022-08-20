import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ShopeeCreateDto } from './dto/createProduct.dto';
import { ShopeeService } from './shopee.service';

@Controller('shopee')
export class ShopeeController {
  constructor(private readonly shopeeService: ShopeeService) {}

  @Post('')
  async createProductByShopee(
    @Res() response,
    @Body() product: ShopeeCreateDto,
  ) {
    const result = await this.shopeeService.createProductShopee(product);
    return response.status(HttpStatus.OK).json({ shopeeProduct: result });
  }
  @Put('')
  async updateProductShopee(@Res() response, @Body() productUpdate) {
    let product = await this.shopeeService.updateProductShopee(productUpdate);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Delete('')
  async deleteProductShopee(@Res() response, @Query() query) {
    const { id } = query;
    let result = await this.shopeeService.deleteProductShopee(id);
    return response.status(HttpStatus.OK).json({ product: result });
  }
  @Post('/search')
  async searchShopee(@Res() response, @Body() body) {
    const { title } = body;
    let products = await this.shopeeService.searchShopee(title);
    return response.status(HttpStatus.OK).json({ products: products });
  }
  @Get('')
  async fetchAllProductShopee(@Res() response) {
    const result = await this.shopeeService.fetchAllProduct();
    return response.status(HttpStatus.OK).json({ products: result });
  }
  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    const product = await this.shopeeService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }

  @Post('/getProductShopee')
  async getProductShopee(@Res() response, @Body() body) {
    const { shopeeUrl } = body;
    let arrT1 = shopeeUrl.split('?');
    let arrT2 = arrT1[1].split('.');
    let shopID = arrT2[2];
    let itemID = arrT2[3].split('%')[0];
    const data = await this.shopeeService.getProductShopeeFromURL(
      shopID,
      itemID,
    );
    return response.status(HttpStatus.OK).json({ products: data });
  }
  @Post('/categories')
  async fetchProductsFromCategories(@Res() response, @Body() categories) {
    const result = await this.shopeeService.fetchProductByCategories(
      categories,
    );

    return response.status(HttpStatus.OK).json({ products: result });
  }
  @Post('/tag')
  async fetchProductsByTag(@Res() response, @Body() tag) {
    console.log('TAG', tag);
    const result = await this.shopeeService.fetchProductsByTag(tag);
    return response.status(HttpStatus.OK).json({ products: result });
  }
}
