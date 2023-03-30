import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly config: ConfigService) {}

  private REGION = this.config.get('REGION');

  private _s3Client = new S3Client({
    region: this.REGION,
    credentials: {
      accessKeyId: this.config.get('ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('SECRET_ACCESS_KEY'),
    },
  });

  async addFileToBucket(file: Express.Multer.File) {
    const fileName = new Date().toISOString() + '-' + file.originalname;

    const params: PutObjectCommandInput = {
      Bucket: this.config.get('BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    await this._s3Client.send(new PutObjectCommand(params));

    return `https://${params.Bucket}.s3.${this.REGION}.amazonaws.com/${params.Key}`;
  }
}
