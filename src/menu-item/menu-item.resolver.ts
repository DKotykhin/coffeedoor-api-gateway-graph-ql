import { Resolver } from '@nestjs/graphql';
import { MenuItemService } from './menu-item.service';

@Resolver()
export class MenuItemResolver {
  constructor(private readonly menuItemService: MenuItemService) {}
}
