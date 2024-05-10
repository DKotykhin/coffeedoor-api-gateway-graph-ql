import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { errorCodeImplementation } from '../utils/error-code-implementation';
import { FileUploadService } from '../file-upload/file-upload.service';
import {
  CreateStoreItemRequest,
  STORE_ITEM_SERVICE_NAME,
  StatusResponse,
  StoreItem,
  StoreItemServiceClient,
  StoreItemWithAd,
  StoreItemWithImages,
  UpdateStoreItemRequest,
} from './store-item.pb';

@Injectable()
export class StoreItemService implements OnModuleInit {
  private storeItemService: StoreItemServiceClient;
  protected readonly logger = new Logger(StoreItemService.name);
  constructor(
    @Inject('STORE_ITEM_SERVICE')
    private readonly storeItemServiceClient: ClientGrpc,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.storeItemService = this.storeItemServiceClient.getService(
      STORE_ITEM_SERVICE_NAME,
    );
  }

  async findBySlugWithAd(slug: string): Promise<StoreItemWithAd> {
    try {
      return await firstValueFrom(
        this.storeItemService.getStoreItemBySlugWithAd({ slug }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async getStoreItemsByCategoryId(id: string): Promise<StoreItemWithImages[]> {
    try {
      const { storeItemList } = await firstValueFrom(
        this.storeItemService.getStoreItemsByCategoryId({ id }),
      );
      return storeItemList;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async getStoreItemBySlug(slug: string): Promise<StoreItemWithImages> {
    try {
      const storeItem = await firstValueFrom(
        this.storeItemService.getStoreItemBySlug({ slug }),
      );
      if (storeItem.images?.length) {
        const imageUrlPromises = storeItem.images.map(async (image) => {
          const imageUrl = await this.fileUploadService.getImageUrl(
            image.image,
          );
          if (imageUrl) return imageUrl;
        });
        storeItem.imageUrl = await Promise.all(imageUrlPromises);
      }
      return storeItem;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async createStoreItem(storeItem: CreateStoreItemRequest): Promise<StoreItem> {
    try {
      return await firstValueFrom(
        this.storeItemService.createStoreItem(storeItem),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async updateStoreItem(storeItem: UpdateStoreItemRequest): Promise<StoreItem> {
    try {
      return await firstValueFrom(
        this.storeItemService.updateStoreItem(storeItem),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async deleteStoreItem(slug: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.storeItemService.deleteStoreItem({ slug }),
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
