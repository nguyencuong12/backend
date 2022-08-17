import { Body, Controller, HttpStatus, Post, Res, Get, Param } from '@nestjs/common';
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
  @Get(':id')
  async fetchProduct(@Res() response, @Param() params, @Body() body) {
    const product = await this.shopeeService.fetchProduct(params.id);
    return response.status(HttpStatus.OK).json({ product: product });
  }
  @Get('')
  async fetchAllProductShopee(@Res() response) {
    const result = await this.shopeeService.fetchAllProduct();
    return response.status(HttpStatus.OK).json({ products: result });
  }
  @Post('/categories')
  async fetchProductsFromCategories(@Res() response, @Body() categories) {
    const result = await this.shopeeService.fetchProductByCategories(
      categories,
    );
    return response.status(HttpStatus.OK).json({ categories: result });
  }
  @Post('/tag')
  async fetchProductsByTag(@Res() response, @Body() tag) {
    console.log("TAG",tag)
    const result = await this.shopeeService.fetchProductsByTag(tag)
    return response.status(HttpStatus.OK).json({ products: result });
  }
}
