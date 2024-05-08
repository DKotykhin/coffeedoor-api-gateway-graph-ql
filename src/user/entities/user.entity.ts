import { Field, ObjectType } from '@nestjs/graphql';

import { RoleTypes } from '../../common/types/enums';
import { EmailConfirm } from '../../auth/entities/email-confirm.entity';
import { ResetPassword } from '../../auth/entities/reset-password.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field(() => RoleTypes)
  role: RoleTypes | string;

  @Field(() => EmailConfirm, { nullable: true })
  emailConfirm?: EmailConfirm;

  @Field(() => ResetPassword, { nullable: true })
  resetPassword?: ResetPassword;
}
