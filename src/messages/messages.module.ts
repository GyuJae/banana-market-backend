import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MessagesService, MessagesResolver, AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
  ],
})
export class MessagesModule {}
