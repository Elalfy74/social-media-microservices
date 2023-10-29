import { FileValidator } from '@nestjs/common';

export class ImageSize extends FileValidator {
  constructor() {
    super({ fileType: /\.(jpg|jpeg|png)$/ });
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    const in_mb = file.size / 1000000;
    return in_mb <= 2;
  }

  buildErrorMessage(): string {
    return `File uploaded is too big. Max size is 2 MB`;
  }
}
