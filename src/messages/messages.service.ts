import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/common.constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/User.entity';
import { SendMessageInput, SendMessageOutput } from './dtos/sendMessage.dto';
import { ShowMessagesInput, ShowMessagesOutput } from './dtos/showMessages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
    private readonly prismaService: PrismaService,
  ) {}

  async sendMessage(
    { roomId, payload, postId }: SendMessageInput,
    currentUser: User,
  ): Promise<SendMessageOutput> {
    try {
      let messageRoom: any;
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: 'This post id is wrong',
        };
      }
      if (roomId) {
        messageRoom = await this.prismaService.messageRoom.findUnique({
          where: {
            id: roomId,
          },
        });
        if (!messageRoom) {
          return {
            ok: false,
            error: 'This roomId is Wrong',
          };
        }
      } else {
        messageRoom = await this.prismaService.messageRoom.create({
          data: {
            postId: post.id,
            sellerId: post.authorId,
            buyerId: currentUser.id,
          },
        });
      }
      const message = await this.prismaService.message.create({
        data: {
          payload,
          messageRoomId: messageRoom.id,
          userId: currentUser.id,
        },
      });

      await this.pubsub.publish('message', { receiveMessage: message });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async showMessages(
    { roomId }: ShowMessagesInput,
    currentUser: User,
  ): Promise<ShowMessagesOutput> {
    try {
      const room = await this.prismaService.messageRoom.findUnique({
        where: {
          id: roomId,
        },
        select: {
          messages: true,
          sellerId: true,
          buyerId: true,
        },
      });
      if (!room) {
        return {
          ok: false,
          error: 'This roomId is Wrong',
        };
      }
      if (currentUser.id !== room.sellerId && currentUser.id !== room.buyerId) {
        return {
          ok: false,
          error: 'No Authorized',
        };
      }
      return {
        ok: true,
        messages: room.messages,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
