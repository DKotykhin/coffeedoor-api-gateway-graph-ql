import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';

import { StoreItemImageService } from './store-item-image.service';
import { StatusResponse } from './store-item-image.pb';

@Controller('store-item-image')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemImageController {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('store-image'))
  uploadStoreImage(
    @Body('slug') slug: string,
    @Body('position') position: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<StatusResponse> {
    return this.storeItemImageService.uploadStoreImage(slug, file, +position);
  }
}
