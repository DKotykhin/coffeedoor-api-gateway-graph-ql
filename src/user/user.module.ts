import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileUploadService } from '../file-upload/file-upload.service';
import { userGrpcConfig } from '../config/grpc.config';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ClientsModule.registerAsync([userGrpcConfig])],
  providers: [UserResolver, UserService, FileUploadService],
  exports: [UserService],
})
export class UserModule {}
