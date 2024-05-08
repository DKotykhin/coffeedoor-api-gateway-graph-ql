import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../types/enums';

import { MenuCategory } from '../../menu-category/entities/menu-category.entity';

@ObjectType()
export class MenuItem {
  @Field(() => LanguageCode)
  language: LanguageCode;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  price: string;

  @Field({ defaultValue: false })
  hidden: boolean;

  @Field({ defaultValue: 0 })
  position: number;

  @Field(() => MenuCategory)
  menuCategory: MenuCategory;
}
