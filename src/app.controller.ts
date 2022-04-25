import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response): string {
    let message = process.env.FRONTEND_URL;
    return response.status(HttpStatus.OK).json({ message: message });

    // return this.appService.getHello();
  }
  @Post()
  create() {
    console.log('CREATE');
  }
}
