import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            if (connectionParams.hasOwnProperty('x-jwt')) {
              const token = connectionParams['x-jwt'];
              return {
                'x-jwt': token,
              };
            }
            return {};
          },
        },
      },
    }),
    UsersModule,
    PrismaModule,
    PostsModule,
    LikesModule,
    HashtagsModule,
    CommonModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})

//npx prisma migrate dev --name add-like
export class AppModule {}
