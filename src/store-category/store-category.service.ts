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
import { UpdateMenuCategoryRequest } from '../menu-category/menu-category.pb';
import { StoreItemImage } from '../store-item-image/store-item-image.pb';
import { FileUploadService } from '../file-upload/file-upload.service';
import { StoreItemWithImages } from '../store-item/store-item.pb';

import {
  CreateStoreCategoryRequest,
  STORE_CATEGORY_SERVICE_NAME,
  StatusResponse,
  StoreCategory,
  StoreCategoryServiceClient,
  StoreCategoryWithItems,
} from './store-category.pb';

@Injectable()
export class StoreCategoryService implements OnModuleInit {
  private storeCategoryService: StoreCategoryServiceClient;
  protected readonly logger = new Logger(StoreCategoryService.name);
  constructor(
    @Inject('STORE_CATEGORY_SERVICE')
    private readonly storeCategoryServiceClient: ClientGrpc,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.storeCategoryService = this.storeCategoryServiceClient.getService(
      STORE_CATEGORY_SERVICE_NAME,
    );
  }

  async findImageUrls(
    storeCategoryList: StoreCategoryWithItems[],
  ): Promise<StoreCategoryWithItems[]> {
    return await Promise.all(
      storeCategoryList.map(async (category: StoreCategoryWithItems) => {
        if (!category.storeItems) return category;
        category.storeItems = await Promise.all(
          category.storeItems.map(async (item: StoreItemWithImages) => {
            if (!item.images) return item;
            item.imageUrl = await Promise.all(
              item.images.map(async (image: StoreItemImage) => {
                return await this.fileUploadService.getImageUrl(image?.image);
              }),
            );
            return item;
          }),
        );
      }),
    );
  }

  async findByLanguage(
    language: LanguageCode,
  ): Promise<StoreCategoryWithItems[]> {
    try {
      const { storeCategoryList } = await firstValueFrom(
        this.storeCategoryService.getStoreCategoriesByLanguage({
          language,
        }),
      );
      await this.findImageUrls(storeCategoryList);
      return storeCategoryList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async findAll(): Promise<StoreCategoryWithItems[]> {
    try {
      const { storeCategoryList } = await firstValueFrom(
        this.storeCategoryService.getAllStoreCategories({}),
      );
      await this.findImageUrls(storeCategoryList);
      return storeCategoryList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async findById(id: string): Promise<StoreCategoryWithItems> {
    try {
      const storeCategory = await firstValueFrom(
        this.storeCategoryService.getStoreCategoryById({ id }),
      );
      if (!storeCategory.storeItems) return storeCategory;
      storeCategory.storeItems = await Promise.all(
        storeCategory.storeItems.map(async (item: StoreItemWithImages) => {
          if (!item.images) return item;
          item.imageUrl = await Promise.all(
            item.images.map(async (image: StoreItemImage) => {
              return await this.fileUploadService.getImageUrl(image?.image);
            }),
          );
          return item;
        }),
      );
      return storeCategory;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async create(
    storeCategory: CreateStoreCategoryRequest,
  ): Promise<StoreCategory> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.createStoreCategory(storeCategory),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async update(
    storeCategory: UpdateMenuCategoryRequest,
  ): Promise<StoreCategory> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.updateStoreCategory(storeCategory),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async delete(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.deleteStoreCategory({ id }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }
}
