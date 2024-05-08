import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';

import { errorCodeImplementation } from '../utils/error-code-implementation';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  StatusResponse,
  User,
} from './auth.pb';
import { EmailDto, PasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtPayload } from './dto/jwtPayload.dto';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  protected readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientGrpc,
    private readonly jwtService: JwtService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.authService =
      this.authServiceClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async getUserByToken(user: Partial<User>): Promise<Partial<User>> {
    if (user.avatar) {
      user.avatar = await this.fileUploadService.getImageUrl(
        'avatar/' + user.avatar,
      );
    }
    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<Partial<User>> {
    try {
      return await firstValueFrom(this.authService.signUp(signUpDto));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async signIn(
    signInDto: SignInDto,
    response: Response,
  ): Promise<Partial<User>> {
    try {
      const user = await firstValueFrom(this.authService.signIn(signInDto));
      const payload: JwtPayload = { email: user.email };
      const auth_token = this.jwtService.sign(payload);
      response.cookie('auth_token', auth_token, { httpOnly: true });
      console.log('auth_token:', auth_token);
      return user;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async confirmEmail(token: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.confirmEmail({ token }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async resendEmail(email: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.resendEmail({ email }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async resetPassword(emailDto: EmailDto): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.resetPassword(emailDto));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async setNewPassword(
    token: string,
    password: PasswordDto['password'],
  ): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.authService.setNewPassword({ token, password }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
