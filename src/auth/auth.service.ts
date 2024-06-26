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

import { errorCodeImplementation } from '../utils/error-code-implementation';
import { FileUploadService } from '../file-upload/file-upload.service';

import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  StatusResponse,
  User,
} from './auth.pb';
import { EmailDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtPayload } from './dto/jwtPayload.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { SignInResponse } from './entities/sign-in-response.entity';

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
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: signUp',
        },
      );
    }
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const user = await firstValueFrom(this.authService.signIn(signInDto));
      if (user?.avatar) {
        user.avatar = await this.fileUploadService.getImageUrl(
          'avatar/' + user.avatar,
        );
      }
      const payload: JwtPayload = { email: user.email };
      const auth_token = this.jwtService.sign(payload);
      this.logger.debug('auth_token:', auth_token);
      return { user, token: auth_token };
    } catch (error) {
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: signIn',
        },
      );
    }
  }

  async confirmEmail(token: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.confirmEmail({ token }));
    } catch (error) {
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: confirmEmail',
        },
      );
    }
  }

  async resendEmail(email: EmailDto): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.resendEmail(email));
    } catch (error) {
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: resendEmail',
        },
      );
    }
  }

  async resetPassword(emailDto: EmailDto): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.authService.resetPassword(emailDto));
    } catch (error) {
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: resetPassword',
        },
      );
    }
  }

  async setNewPassword(
    newPasswordDto: NewPasswordDto,
  ): Promise<StatusResponse> {
    const { token, password } = newPasswordDto;
    try {
      return await firstValueFrom(
        this.authService.setNewPassword({ token, password }),
      );
    } catch (error) {
      throw new HttpException(
        error.details,
        errorCodeImplementation(error.code),
        {
          cause: 'AuthService: setNewPassword',
        },
      );
    }
  }
}
