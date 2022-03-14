import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async Login(@Body() body) {
    console.log('LOGIN CALL', body);
    this.userService.login(body);
  }
}
