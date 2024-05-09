import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoreItemImage {
  @Field()
  id: string;

  @Field()
  image: string;

  @Field({ defaultValue: 1 })
  position: number;
}
