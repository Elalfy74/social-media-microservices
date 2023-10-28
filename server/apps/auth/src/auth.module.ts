import { AuthPrismaService, DocsController, PrismaModule, validationSchema } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: './apps/auth/.env',
    }),
    JwtModule,
    PrismaModule.forRoot(AuthPrismaService),
  ],
  controllers: [DocsController, AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
