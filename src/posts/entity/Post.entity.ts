import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { Hashtag } from 'src/hashtags/entity/Hashtag.entity';
import { Like } from 'src/likes/entity/Like.entity';
import { User } from 'src/users/entity/User.entity';

@ObjectType({ isAbstract: true })
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => Boolean)
  @IsBoolean()
  soldOut: boolean;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [String], { nullable: true })
  @IsString()
  files?: string[] | null;

  @Field(() => Int)
  @IsInt()
  viewCount: number;

  @Field(() => User)
  author: User;

  @Field(() => [Like])
  likes: Like[];

  @Field(() => [Hashtag])
  hashtags: Hashtag[];
}
