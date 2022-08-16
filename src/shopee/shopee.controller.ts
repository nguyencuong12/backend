import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
}
