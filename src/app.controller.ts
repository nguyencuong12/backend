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
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(@Res() response): string {
    let message = process.env.FRONTEND_URL;
    return response.status(HttpStatus.OK).json({ message: message });

    // return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Res() res, @Req() req) {
    console.log('REQ COMMING !!!');
    // return req.user;
    // console.log('ABC');
    let access_token = await this.authService.login(req.user);
    console.log('ACCRESS_TOKEN', access_token);

    return res.status(HttpStatus.OK).json({ user: req.user });

    // return res.status(HttpStatus.OK).json({ access_token: access_token });
  }
}
