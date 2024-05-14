import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { EmailDto, PasswordDto } from '../auth/dto/auth.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { StatusResponse } from '../common/entities/status-response.entity';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Mutation(() => StatusResponse)
  async deleteAvatar(@Args('id') id: string): Promise<StatusResponse> {
    return this.userService.deleteAvatar(id);
  }
}
