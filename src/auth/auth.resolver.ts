import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '../user/entities/user.entity';
import { StatusResponse } from '../common/entities/status-response.entity';

import { AuthService } from './auth.service';
import { User as UserType } from './auth.pb';
import { GetUser } from './decorators/get-user.decorator';
import { EmailDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { SignInResponse } from './entities/sign-in-response.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getUserByToken(@GetUser() user: Partial<User>): Promise<Partial<UserType>> {
    return this.authService.getUserByToken(user);
  }

  @Mutation(() => User)
  signUp(@Args('signUpDto') signUpDto: SignUpDto): Promise<Partial<UserType>> {
    return this.authService.signUp(signUpDto);
  }

  @Mutation(() => SignInResponse)
  signIn(@Args('signInDto') signInDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto);
  }

  @Mutation(() => StatusResponse)
  confirmEmail(@Args('token') token: string): Promise<StatusResponse> {
    return this.authService.confirmEmail(token);
  }

  @Mutation(() => StatusResponse)
  resendEmail(@Args('email') emailDto: EmailDto): Promise<StatusResponse> {
    return this.authService.resendEmail(emailDto);
  }

  @Mutation(() => StatusResponse)
  resetPassword(@Args('email') emailDto: EmailDto): Promise<StatusResponse> {
    return this.authService.resetPassword(emailDto);
  }

  @Mutation(() => StatusResponse)
  setNewPassword(
    @Args('newPassword') newPasswordDto: NewPasswordDto,
  ): Promise<StatusResponse> {
    return this.authService.setNewPassword(newPasswordDto);
  }
}
