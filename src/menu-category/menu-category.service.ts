import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
  protected readonly logger = new Logger(MenuCategoryService.name);
  constructor(
    @Inject('MENU_CATEGORY_SERVICE')
    private readonly menuServiceClient: ClientGrpc,
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
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getMenuCategoriesByLanguage({
          language,
        }),
      );
      return menuCategoryList;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findAll(): Promise<MenuCategoryWithItems[]> {
    try {
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getAllMenuCategories({}),
      );
      return menuCategoryList;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findById(id: string): Promise<MenuCategoryWithItems> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.getMenuCategoryById({ id }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
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
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
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
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
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
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async remove(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.deleteMenuCategory({ id }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
