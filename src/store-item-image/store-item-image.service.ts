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
  STORE_ITEM_IMAGE_SERVICE_NAME,
  StatusResponse,
  StoreItemImageServiceClient,
} from './store-item-image.pb';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class StoreItemImageService implements OnModuleInit {
  private storeItemImageService: StoreItemImageServiceClient;
  protected readonly logger = new Logger(StoreItemImageService.name);
  constructor(
    @Inject('STORE_ITEM_IMAGE_SERVICE')
    private readonly storeItemImageServiceClient: ClientGrpc,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.storeItemImageService = this.storeItemImageServiceClient.getService(
      STORE_ITEM_IMAGE_SERVICE_NAME,
    );
  }

  async uploadStoreImage(
    slug: string,
    file: Express.Multer.File,
    position: number,
  ): Promise<StatusResponse> {
    try {
      const fileName = await this.fileUploadService.uploadStoreImage(
        slug,
        file,
      );
      await firstValueFrom(
        this.storeItemImageService.createImage({
          storeItem: { slug },
          image: fileName,
          position,
        }),
      );

      return {
        status: true,
        message: `Store image ${fileName} uploaded successfully`,
      };
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async deleteStoreImage(image: string): Promise<StatusResponse> {
    try {
      await this.fileUploadService.deleteImage('store/' + image);
      await firstValueFrom(this.storeItemImageService.deleteImage({ image }));

      return {
        status: true,
        message: `Store image ${image} deleted successfully`,
      };
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
