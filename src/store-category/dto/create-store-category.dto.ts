import { Field, InputType, Int } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';

@InputType()
export class CreateStoreCategoryDto {
  @Field(() => LanguageCode)
  language: LanguageCode;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle: string;

  @Field({ nullable: true, defaultValue: false })
  hidden?: boolean;

  @Field(() => Int, { defaultValue: 0 })
  position: number;
}
