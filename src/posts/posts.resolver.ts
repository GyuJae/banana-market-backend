import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { User } from 'src/users/entity/User.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Mutation(() => CreatePostOutput)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() currentUser: User,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, currentUser);
  }
}
