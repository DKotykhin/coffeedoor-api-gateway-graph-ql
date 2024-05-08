import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
