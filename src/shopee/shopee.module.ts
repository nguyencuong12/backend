import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopeeController } from './shopee.controller';
import { Shopee, ShopeeSchema } from './shopee.schema';
import { ShopeeService } from './shopee.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shopee.name, schema: ShopeeSchema }]),
  ],
  controllers: [ShopeeController],
  providers: [ShopeeService],
})
export class ShopeeModule {}
