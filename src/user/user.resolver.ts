import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Body,
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

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { EmailDto, PasswordDto } from '../auth/dto/auth.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusResponse } from '../common/entities/status-response.entity';

@UseGuards(GqlAuthGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUserByEmail(@Args('email') emailDto: EmailDto): Promise<User> {
    return this.userService.getUserByEmail(emailDto.email);
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Mutation(() => StatusResponse)
  async deleteUser(@GetUser() user: User): Promise<StatusResponse> {
    return this.userService.deleteUser(user.id);
  }

  @Mutation(() => StatusResponse)
  async confirmPassword(
    @Args('password') passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponse> {
    return this.userService.confirmPassword(user.id, passwordDto.password);
  }

  @Mutation(() => StatusResponse)
  async changePassword(
    @Args('password') passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponse> {
    return this.userService.changePassword(user.id, passwordDto.password);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @Body() id: string,
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
    return this.userService.uploadAvatar(id, avatar);
  }

  @Mutation(() => StatusResponse)
  async deleteAvatar(@Args('id') id: string): Promise<StatusResponse> {
    return this.userService.deleteAvatar(id);
  }
}
