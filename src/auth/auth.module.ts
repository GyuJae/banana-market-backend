import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';

export const AUTH_SERVICE = 'AUTH_SERVICE';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
  ],
  providers: [{ provide: AUTH_SERVICE, useValue: AuthService }],
})
export class AuthModule {}
