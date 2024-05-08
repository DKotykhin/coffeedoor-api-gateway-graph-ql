import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { menuCategoryGrpcConfig } from '../config/grpc.config';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryResolver } from './menu-category.resolver';
import { AllMenuResolver } from './all-menu.resolver';

@Module({
  imports: [ClientsModule.registerAsync([menuCategoryGrpcConfig])],
  providers: [AllMenuResolver, MenuCategoryResolver, MenuCategoryService],
})
export class MenuCategoryModule {}
