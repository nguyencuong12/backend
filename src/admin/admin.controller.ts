import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { AdminService } from './admin.service';

@UseGuards(AuthenticatedGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/order')
  async getAllOrder(@Res() res) {
    let result = await this.adminService.getAllOrder();
    res.status(HttpStatus.OK).json({ message: result });
  }
}
