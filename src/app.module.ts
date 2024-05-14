import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';

import { validate } from './utils/env.validator';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { StoreCategoryModule } from './store-category/store-category.module';
import { StoreItemModule } from './store-item/store-item.module';
import { StoreItemImageModule } from './store-item-image/store-item-image.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    FileUploadModule,
    HealthCheckModule,
    MenuCategoryModule,
    MenuItemModule,
    OrderModule,
    OrderItemModule,
    StoreCategoryModule,
    StoreItemModule,
    StoreItemImageModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
