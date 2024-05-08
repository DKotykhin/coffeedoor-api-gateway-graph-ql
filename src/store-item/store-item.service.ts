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
import {
  CreateStoreItemRequest,
  STORE_ITEM_SERVICE_NAME,
  StatusResponse,
  StoreItem,
  StoreItemServiceClient,
  StoreItemWithAd,
  UpdateStoreItemRequest,
} from './store-item.pb';

@Injectable()
export class StoreItemService implements OnModuleInit {
  private storeItemService: StoreItemServiceClient;
  protected readonly logger = new Logger(StoreItemService.name);
  constructor(
    @Inject('STORE_ITEM_SERVICE')
    private readonly storeItemServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.storeItemService = this.storeItemServiceClient.getService(
      STORE_ITEM_SERVICE_NAME,
    );
  }

  async findByCategoryId(id: string): Promise<StoreItem[]> {
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

  async findBySlug(slug: string): Promise<StoreItem> {
    try {
      return await firstValueFrom(
        this.storeItemService.getStoreItemBySlug({ slug }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
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

  async create(storeItem: CreateStoreItemRequest): Promise<StoreItem> {
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

  async update(storeItem: UpdateStoreItemRequest): Promise<StoreItem> {
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

  async delete(slug: string): Promise<StatusResponse> {
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
