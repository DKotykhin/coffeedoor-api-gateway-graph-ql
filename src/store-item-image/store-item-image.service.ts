import {
  HttpException,
  Inject,
  Injectable,
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
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'StoreItemImage: upload',
      });
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
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      throw new HttpException(message, code, {
        cause: 'StoreItemImage: delete',
      });
    }
  }
}
