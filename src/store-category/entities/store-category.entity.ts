import { Field, Int, ObjectType } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';
import { StoreItem } from '../../store-item/entities/store-item.entity';

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

  @Field(() => Int, { defaultValue: 0 })
  position: number;

  @Field(() => [StoreItem], { nullable: true })
  storeItems?: StoreItem[];
}
