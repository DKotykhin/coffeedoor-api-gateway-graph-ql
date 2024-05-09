import { Field, ObjectType } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';

@ObjectType()
export class StoreCategory {
  @Field()
  id: string;

  @Field(() => LanguageCode)
  language: LanguageCode | string;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ defaultValue: false })
  hidden: boolean;
}
