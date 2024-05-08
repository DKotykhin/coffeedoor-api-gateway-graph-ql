import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../types/enums';

import { MenuItem } from '../../menu-item/entities/menu-item.entity';

@ObjectType()
export class MenuCategory {
  @Field(() => LanguageCode)
  language: LanguageCode;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field({ defaultValue: false })
  hidden: boolean;

  @Field({ defaultValue: 0 })
  position: number;

  @Field(() => [MenuItem], { nullable: true })
  menuItems: MenuItem[];
}
