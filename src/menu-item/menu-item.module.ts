import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { menuItemGrpcConfig } from '../config/grpc.config';
import { MenuItemService } from './menu-item.service';
import { MenuItemResolver } from './menu-item.resolver';

@Module({
  imports: [ClientsModule.registerAsync([menuItemGrpcConfig])],
  providers: [MenuItemResolver, MenuItemService],
})
export class MenuItemModule {}
