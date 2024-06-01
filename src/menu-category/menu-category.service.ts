import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { LanguageCode } from '../common/types/enums';
import { errorCodeImplementation } from '../utils/error-code-implementation';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import {
  MENU_CATEGORY_SERVICE_NAME,
  MenuCategory,
  MenuCategoryServiceClient,
  StatusResponse,
} from './menu-category.pb';
import { MenuCategoryWithItems } from './entities/menu-category-with-items.entity';

@Injectable()
export class MenuCategoryService implements OnModuleInit {
  private menuCategoryService: MenuCategoryServiceClient;
  constructor(
    @Inject('MENU_CATEGORY_SERVICE')
    private readonly menuServiceClient: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.menuCategoryService = this.menuServiceClient.getService(
      MENU_CATEGORY_SERVICE_NAME,
    );
  }

  async findByLanguage(
    language: LanguageCode,
  ): Promise<MenuCategoryWithItems[]> {
    try {
      const menu: {
        language: LanguageCode;
        menuCategoryList: MenuCategoryWithItems[];
      } = await this.cacheManager.get('menu');
      if (menu && menu.language === language) {
        return menu.menuCategoryList;
      }
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getMenuCategoriesByLanguage({
          language,
        }),
      );
      await this.cacheManager.set('menu', { language, menuCategoryList });
      return menuCategoryList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: findByLanguage',
      });
    }
  }

  async findAll(): Promise<MenuCategoryWithItems[]> {
    try {
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getAllMenuCategories({}),
      );
      return menuCategoryList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: findAll',
      });
    }
  }

  async findById(id: string): Promise<MenuCategoryWithItems> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.getMenuCategoryById({ id }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: findById',
      });
    }
  }

  async create(
    createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.createMenuCategory(createMenuCategoryDto),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: create',
      });
    }
  }

  async update(
    updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.updateMenuCategory({
          ...updateMenuCategoryDto,
        }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: update',
      });
    }
  }

  async changePosition(
    changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.changeMenuCategoryPosition(
          changeMenuCategoryPositionDto,
        ),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: changePosition',
      });
    }
  }

  async remove(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.deleteMenuCategory({ id }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'MenuCategoryService: remove',
      });
    }
  }
}
