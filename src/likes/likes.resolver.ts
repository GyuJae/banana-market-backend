import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { CreateAccountOutput } from 'src/users/dtos/CreateAccount.dto';
import { User } from 'src/users/entity/User.entity';
import { ToggleLikeInput, ToggleLikeOutput } from './dtos/toggleLike.dto';
import { Like } from './entity/Like.entity';
import { LikesService } from './likes.service';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likeService: LikesService) {}

  @Mutation(() => CreateAccountOutput)
  @UseGuards(GqlAuthGuard)
  async toggleLike(
    @Args('input') toggleLikeInput: ToggleLikeInput,
    @CurrentUser() currentUser: User,
  ): Promise<ToggleLikeOutput> {
    return this.likeService.toggleLike(toggleLikeInput, currentUser);
  }
}
