import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { authGrpcConfig, userGrpcConfig } from '../config/grpc.config';
import { UserService } from '../user/user.service';
import { jwtTokenConfig } from '../config/jwt-token.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([authGrpcConfig, userGrpcConfig]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtTokenConfig,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtStrategy,
    FileUploadService,
  ],
})
export class AuthModule {}
