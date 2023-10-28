import { DynamicModule, Global, Module } from '@nestjs/common';

import { ClassConstructor } from '../interfaces';

@Global()
@Module({})
export class PrismaModule {
  static forRoot(service: ClassConstructor): DynamicModule {
    const providers = [
      {
        provide: service,
        useClass: service,
      },
    ];

    return {
      module: PrismaModule,
      providers,
      exports: providers,
    };
  }
}
