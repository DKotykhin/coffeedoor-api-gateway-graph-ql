import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AUTH_PACKAGE_NAME } from '../auth/auth.pb';
import { HEALTH_CHECK_PACKAGE_NAME } from '../health-check/health-check.pb';
import { MENU_CATEGORY_PACKAGE_NAME } from '../menu-category/menu-category.pb';
import { MENU_ITEM_PACKAGE_NAME } from '../menu-item/menu-item.pb';
import { ORDER_PACKAGE_NAME } from '../order/order.pb';
import { ORDER_ITEM_PACKAGE_NAME } from '../order-item/order-item.pb';
import { STORE_CATEGORY_PACKAGE_NAME } from '../store-category/store-category.pb';
import { STORE_ITEM_IMAGE_PACKAGE_NAME } from '../store-item-image/store-item-image.pb';
import { STORE_ITEM_PACKAGE_NAME } from '../store-item/store-item.pb';
import { USER_PACKAGE_NAME } from '../user/user.pb';

export const menuCategoryGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_CATEGORY_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: MENU_CATEGORY_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/menu/menu-category.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const menuItemGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_ITEM_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: MENU_ITEM_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/menu/menu-item.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const menuHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const userHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'USER_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const authGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'AUTH_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/user/auth.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const userGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'USER_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: USER_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/user/user.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const storeHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'STORE_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('STORE_SERVICE_HOST')}:${configService.get<string>('STORE_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const storeCategoryGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'STORE_CATEGORY_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: STORE_CATEGORY_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/store/store-category.proto'),
      url: `${configService.get<string>('STORE_SERVICE_HOST')}:${configService.get<string>('STORE_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const storeItemGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'STORE_ITEM_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: STORE_ITEM_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/store/store-item.proto'),
      url: `${configService.get<string>('STORE_SERVICE_HOST')}:${configService.get<string>('STORE_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const storeItemImageGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'STORE_ITEM_IMAGE_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: STORE_ITEM_IMAGE_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/store/store-item-image.proto'),
      url: `${configService.get<string>('STORE_SERVICE_HOST')}:${configService.get<string>('STORE_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const orderHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'ORDER_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('ORDER_SERVICE_HOST')}:${configService.get<string>('ORDER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const orderGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'ORDER_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: ORDER_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/order/order.proto'),
      url: `${configService.get<string>('ORDER_SERVICE_HOST')}:${configService.get<string>('ORDER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const orderItemGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'ORDER_ITEM_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: ORDER_ITEM_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/order/order-item.proto'),
      url: `${configService.get<string>('ORDER_SERVICE_HOST')}:${configService.get<string>('ORDER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};
