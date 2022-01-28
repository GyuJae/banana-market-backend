import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/User.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/CreatePost.dto';

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
}
