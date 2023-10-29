import { Module } from '@nestjs/common';

import { CloudinaryService } from './cloudinary.service';
import { StorageService } from './storage.service';

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: CloudinaryService,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
