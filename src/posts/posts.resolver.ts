import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { User } from 'src/users/entity/User.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePostInput, CreatePostOutput } from './dtos/CreatePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/EditPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/ReadPost.dto';
import { SearchPostsInput, SearchPostsOutput } from './dtos/SearchPosts.dto';
import {
  ShowPostByHashtagInput,
  ShowPostByHashtagOutput,
} from './dtos/ShowPostByHashtag.dto';
import { ShowPostsNearbyMeOutput } from './dtos/ShowPostsNearbyMe.dto';
import { Post } from './entity/Post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {}

  @ResolveField(() => Int)
  async likeCount(@Parent() post: Post): Promise<number> {
    return this.postService.likeCount(post);
  }

  @ResolveField(() => User)
  async author(@Parent() { authorId }: Post): Promise<User> {
    return this.userService.findById(authorId);
  }

  @Query(() => ReadPostOutput)
  @UseGuards(GqlAuthGuard)
  async readPost(
    @Args('input') readPostInput: ReadPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<ReadPostOutput> {
    return this.postService.readPost(readPostInput, currentUser);
  }

  @Query(() => ShowPostsNearbyMeOutput)
  @UseGuards(GqlAuthGuard)
  async showPostsNearbyMe(
    @CurrentUser() currentUser: User,
  ): Promise<ShowPostsNearbyMeOutput> {
    return this.postService.showPostsNearbyMe(currentUser);
  }

  @Query(() => ShowPostByHashtagOutput)
  @UseGuards(GqlAuthGuard)
  async showPostByHashtag(
    @Args('input') showPostByHashtagInput: ShowPostByHashtagInput,
  ): Promise<ShowPostByHashtagOutput> {
    return this.postService.showPostByHashtag(showPostByHashtagInput);
  }

  @Query(() => SearchPostsOutput)
  @UseGuards(GqlAuthGuard)
  async searchPosts(
    @Args('input') searchPostsInput: SearchPostsInput,
  ): Promise<SearchPostsOutput> {
    return this.postService.searchPosts(searchPostsInput);
  }

  @Mutation(() => CreatePostOutput)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() currentUser: User,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, currentUser);
  }

  @Mutation(() => EditPostOutput)
  @UseGuards(GqlAuthGuard)
  async editPost(
    @Args('input') editPostInput: EditPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(editPostInput, currentUser);
  }
}
