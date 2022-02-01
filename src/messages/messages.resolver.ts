import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { PUB_SUB } from 'src/common/common.constants';
import { User } from 'src/users/entity/User.entity';
import { SendMessageInput, SendMessageOutput } from './dtos/sendMessage.dto';
import { ShowMessagesInput, ShowMessagesOutput } from './dtos/showMessages.dto';
import { Message } from './entity/Message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messageService: MessagesService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(() => ShowMessagesOutput)
  @UseGuards(GqlAuthGuard)
  async showMessages(
    @Args('input') showMessageInput: ShowMessagesInput,
    @CurrentUser() currentUser: User,
  ): Promise<ShowMessagesOutput> {
    return this.messageService.showMessages(showMessageInput, currentUser);
  }

  @Mutation(() => SendMessageOutput)
  @UseGuards(GqlAuthGuard)
  async sendMessage(
    @CurrentUser() currentUser: User,
    @Args('input') sendMessageInput: SendMessageInput,
  ): Promise<SendMessageOutput> {
    return this.messageService.sendMessage(sendMessageInput, currentUser);
  }

  @Subscription(() => String, {
    filter: ({ receiveMessage }, { roomId }) => {
      return receiveMessage.messageRoomId === roomId;
    },
    resolve: ({ receiveMessage }) => {
      return receiveMessage.payload;
    },
  })
  @UseGuards(GqlAuthGuard)
  async receiveMessage(
    @CurrentUser() currentUser: User,
    @Args('roomId') roomId: number,
  ) {
    return this.pubsub.asyncIterator('message');
  }
}
