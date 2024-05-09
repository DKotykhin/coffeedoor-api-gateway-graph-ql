import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../common/types/enums';

import { MenuItem } from '../../menu-item/entities/menu-item.entity';

@ObjectType()
export class MenuCategory {
  @Field()
  id: string;

  @Field(() => LanguageCode)
  language: LanguageCode | string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field({ defaultValue: false })
  hidden: boolean;

  @Field(() => Int, { defaultValue: 0 })
  position: number;

  @Field(() => [MenuItem], { nullable: true })
  menuItems: MenuItem[];
}
