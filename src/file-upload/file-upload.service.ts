import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as sharp from 'sharp';
import * as crypto from 'crypto';

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('AWS_REGION'),
  });

  async getImageUrl(fileKey: string) {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: fileKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return url;
  }

  async uploadAvatar(id: string, avatar: Express.Multer.File): Promise<string> {
    try {
      const fileName = id + '-' + avatar.fieldname + '.webp';
      const avatarPath = `avatar/${fileName}`;

      const fileBuffer: Buffer = await sharp(avatar.buffer)
        .webp()
        .resize(200)
        .toBuffer();

      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: avatarPath,
        Body: fileBuffer,
        ContentType: 'image/webp',
      };
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);

      return fileName;
    } catch (err) {
      throw new HttpException(
        "Can't upload avatar",
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'FileUploadService: uploadAvatar',
        },
      );
    }
  }

  async uploadStoreImage(
    slug: string,
    image: Express.Multer.File,
  ): Promise<string> {
    try {
      const buffer = crypto.randomBytes(2);
      const token = buffer.toString('hex');
      const fileName = slug + '-' + token + '.webp';
      const storePath = `store/${fileName}`;

      const fileBuffer = await sharp(image.buffer)
        .webp()
        .resize(800)
        .toBuffer();

      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: storePath,
        Body: fileBuffer,
        ContentType: 'image/webp',
      };
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);

      return storePath;
    } catch (err) {
      throw new HttpException(
        "Can't upload store image",
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'FileUploadService: uploadStoreImage',
        },
      );
    }
  }

  async deleteImage(fileKey: string): Promise<boolean> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: fileKey,
    };
    const command = new DeleteObjectCommand(params);
    try {
      await this.s3Client.send(command);
    } catch (error) {
      throw new HttpException(
        "Can't delete image",
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'FileUploadService: deleteImage',
        },
      );
    }

    return true;
  }
}
