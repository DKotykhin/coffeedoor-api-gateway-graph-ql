import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { UserService } from './user.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { StatusResponse, User } from './user.pb';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('user')
@UseGuards(GqlAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<StatusResponse> {
    return this.userService.uploadAvatar(user.id, avatar);
  }
}
