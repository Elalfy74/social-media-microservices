import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import { StorageService } from './storage.service';

@Injectable()
export class CloudinaryService implements StorageService {
  constructor(public config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUD_NAME'),
      api_key: config.get('CLOUD_API_KEY'),
      api_secret: config.get('CLOUD_SECRET_KEY'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;

    return (await cloudinary.uploader.upload(dataURI)).url;
  }
}
