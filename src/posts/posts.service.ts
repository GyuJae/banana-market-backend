import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/User.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/CreatePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/EditPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/ReadPost.dto';
import { SearchPostsInput, SearchPostsOutput } from './dtos/SearchPosts.dto';
import {
  ShowPostByHashtagInput,
  ShowPostByHashtagOutput,
} from './dtos/ShowPostByHashtag.dto';
import { Post } from './entity/Post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    { title, location, description, hashtagInput, price }: CreatePostInput,
    currentUser: User,
  ): Promise<CreatePostOutput> {
    try {
      const hashtagsObjs = hashtagInput.split(',').map((hashtag) => {
        return { where: { hashtag }, create: { hashtag } };
      });

      await this.prismaService.post.create({
        data: {
          title,
          author: {
            connect: {
              id: currentUser.id,
            },
          },
          location,
          description,
          price,
          ...(hashtagsObjs.length > 0 && {
            hashtags: {
              connectOrCreate: hashtagsObjs,
            },
          }),
        },
      });
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

  async readPost(
    { postId }: ReadPostInput,
    currentUser: User,
  ): Promise<ReadPostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: 'This Post not found',
        };
      }
      if (post.authorId !== currentUser.id) {
        await this.prismaService.post.update({
          where: {
            id: post.id,
          },
          data: {
            viewCount: post.viewCount + 1,
          },
        });
      }
      return {
        ok: true,
        post,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editPost(
    { postId, hashtagInput, ...editPostInput }: EditPostInput,
    currentUser: User,
  ): Promise<EditPostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id: postId },
        select: {
          hashtags: {
            select: {
              hashtag: true,
            },
          },
          authorId: true,
        },
      });
      const hashtagsObjs = hashtagInput.split(',').map((hashtag) => {
        return { where: { hashtag }, create: { hashtag } };
      });
      if (!post) {
        return {
          ok: false,
          error: 'Post not found.',
        };
      }
      if (post.authorId !== currentUser.id) {
        return {
          ok: false,
          error: 'Not authorized.',
        };
      }

      await this.prismaService.post.update({
        where: {
          id: postId,
        },
        data: {
          ...editPostInput,
          hashtags: {
            disconnect: post.hashtags,
            connectOrCreate: hashtagsObjs,
          },
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  async showPostByHashtag({
    hashtag,
  }: ShowPostByHashtagInput): Promise<ShowPostByHashtagOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          hashtags: {
            some: {
              hashtag,
            },
          },
        },
      });
      return {
        ok: true,
        posts,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchPosts({ keyword }: SearchPostsInput): Promise<SearchPostsOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          title: {
            contains: keyword,
          },
        },
      });
      return {
        ok: true,
        posts,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async likeCount({ id }: Post): Promise<number> {
    try {
      const likes = await this.prismaService.like.findMany({
        where: {
          postId: id,
        },
      });
      if (!likes) {
        return 0;
      }
      return likes.length;
    } catch {
      return 0;
    }
  }
}
