import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
// import { Authenticate } from './auth/auth.middleware';
// import { ProductController } from './product/product.controller';

import { SearchModule } from './search/search.module';

import { GuestModule } from './guest/guest.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './auth/local.strategy';
import { AdminModule } from './admin/admin.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ShopeeModule } from './shopee/shopee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/gasanhkiet'),
    ProductModule,
    SearchModule,
    GuestModule,
    ImageModule,
    AuthModule,
    AdminModule,
    ShopeeModule,

    // UsersModule,
    // PassportModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService /*LocalStrategy*/,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(Authenticate)
//       .exclude(
//         { path: 'product', method: RequestMethod.GET },
//         { path: 'product/:id', method: RequestMethod.GET },
//       )
//       .forRoutes(ProductController);
//   }
// }
