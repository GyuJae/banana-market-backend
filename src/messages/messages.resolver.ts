import { Inject, UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { PUB_SUB } from 'src/common/common.constants';
import { User } from 'src/users/entity/User.entity';
import { MessagesService } from './messages.service';

@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messageService: MessagesService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async sendMessage(@CurrentUser() currentUser: User) {
    await this.pubsub.publish('message', {
      receiveMessage: 'hellohellohello',
    });
    return true;
  }

  @Subscription(() => String)
  @UseGuards(GqlAuthGuard)
  async receiveMessage(@CurrentUser() currentUser: User) {
    return this.pubsub.asyncIterator('message');
  }
}
