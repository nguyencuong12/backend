import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('admin')
export class AdminController {
  @Get('')
  async getAdmin(@Res() res) {
    console.log('CUONG');
    res.status(HttpStatus.OK).json({ message: 'Cuong' });
  }
}
