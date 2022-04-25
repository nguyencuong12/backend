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
import { Authenticate } from './auth/auth.middleware';
import { ProductController } from './product/product.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';

import { GuestModule } from './guest/guest.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/sashimeomeo'),
    MulterModule.register({
      limits: { fieldSize: 25 * 1025 * 1024 },
      // limits: { fileSize: 25 * 1025 * 1024 * 200 },
    }),
    ProductModule,
    AuthModule,
    UserModule,
    SearchModule,
    GuestModule,

    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
