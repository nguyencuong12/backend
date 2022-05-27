import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { Guest, GuestSchema } from './guest.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from 'src/admin/admin.service';
import { AdminSchema, Admin } from 'src/admin/admin.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guest.name, schema: GuestSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService, AdminService],
})
export class GuestModule {}
