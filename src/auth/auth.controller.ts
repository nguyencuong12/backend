import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Get,
  Body,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedGuard } from './auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() body) {
    return this.authService.login(body);
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  async getProfile(@Res() res) {
    return res.status(HttpStatus.OK).json({ status: 'ACCEPT ROUTE !' });
  }
}
