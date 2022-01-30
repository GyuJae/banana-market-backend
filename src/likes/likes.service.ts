import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/User.entity';
import { ToggleLikeInput, ToggleLikeOutput } from './dtos/toggleLike.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async toggleLike(
    { postId }: ToggleLikeInput,
    currentUser: User,
  ): Promise<ToggleLikeOutput> {
    try {
      const likeStatus = await this.prismaService.like.findUnique({
        where: {
          postId_userId: {
            postId,
            userId: currentUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (!likeStatus) {
        await this.prismaService.like.create({
          data: {
            postId,
            userId: currentUser.id,
          },
        });
      } else {
        await this.prismaService.like.delete({
          where: {
            postId_userId: {
              postId,
              userId: currentUser.id,
            },
          },
        });
      }
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
