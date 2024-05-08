import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { errorCodeImplementation } from '../utils/error-code-implementation';
import { FileUploadService } from '../file-upload/file-upload.service';
import {
  StatusResponse,
  USER_SERVICE_NAME,
  User,
  UserServiceClient,
} from './user.pb';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;
  protected readonly logger = new Logger(UserService.name);
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientGrpc,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.userService =
      this.userServiceClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await firstValueFrom(this.userService.getUserByEmail({ email }));
    } catch (error) {
      this.logger.error(error?.details);
      return null;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await firstValueFrom(this.userService.getUserById({ id }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await firstValueFrom(
        this.userService.updateUser({ id, ...updateUserDto }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async deleteUser(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.userService.deleteUser({ id }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async confirmPassword(id: string, password: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.userService.confirmPassword({ id, password }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async changePassword(id: string, password: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.userService.changePassword({ id, password }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async uploadAvatar(
    id: string,
    avatar: Express.Multer.File,
  ): Promise<StatusResponse> {
    try {
      const fileName = await this.fileUploadService.uploadAvatar(id, avatar);
      await firstValueFrom(
        this.userService.updateUser({ id, avatar: fileName }),
      );
      return {
        status: true,
        message: 'Avatar uploaded successfully',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        "Can't upload avatar",
        errorCodeImplementation(error.code),
      );
    }
  }

  async deleteAvatar(id: string): Promise<StatusResponse> {
    try {
      const user = await firstValueFrom(this.userService.getUserById({ id }));
      if (!user?.avatar) {
        return {
          status: false,
          message: 'No avatar found',
        };
      }
      await this.fileUploadService.deleteImage('avatar/' + user.avatar);
      await firstValueFrom(this.userService.updateUser({ id, avatar: '' }));
      return {
        status: true,
        message: 'Avatar deleted successfully',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        "Can't delete avatar",
        errorCodeImplementation(error.code),
      );
    }
  }
}
