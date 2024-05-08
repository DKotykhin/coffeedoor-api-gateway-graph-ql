import { Resolver } from '@nestjs/graphql';
import { StoreCategoryService } from './store-category.service';

@Resolver()
export class StoreCategoryResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}
}
