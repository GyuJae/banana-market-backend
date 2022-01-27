import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail } from 'class-validator';
import { Post } from 'src/posts/entity/Post.entity';

@ObjectType({ isAbstract: true })
export class Hashtag {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => String)
  @IsEmail()
  hashtag: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
