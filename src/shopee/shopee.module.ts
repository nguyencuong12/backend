import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopeeController } from './shopee.controller';
import { Shopee, ShopeeSchema ,ShopeeCategories,ShopeeCategoriesSchema } from './shopee.schema';
import { ShopeeService } from './shopee.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shopee.name, schema: ShopeeSchema },
      {name:ShopeeCategories.name,schema:ShopeeCategoriesSchema}
    ]),
  ],
  controllers: [ShopeeController],
  providers: [ShopeeService],
})
export class ShopeeModule {}
