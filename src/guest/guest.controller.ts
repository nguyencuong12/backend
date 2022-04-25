import { Controller, Res, Post, HttpStatus, Get, Body } from '@nestjs/common';
import { GuestService } from './guest.service';

import { GuestDto } from './dto/orderInterface';
@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Get('')
  async fetchOrders(@Res() response) {
    return response
      .status(HttpStatus.OK)
      .json({ message: 'FETCH GUEST ORDER !!' });
  }
  @Post('/orders')
  async orderProducts(@Res() response, @Body() body: GuestDto) {
    let result = await this.guestService.orderProducts(body);
    if (result) {
      return response.status(HttpStatus.OK).json({ message: 'Order success' });
    }

    // return response;
  }
}
