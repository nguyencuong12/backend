import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
// import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  // constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(@Res() response): string {
    let message = 'HELLO WORD';
    return response.status(HttpStatus.OK).json({ message: message });

    // return t

    // this.appService.getHello();
  }
}
