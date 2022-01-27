import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Post } from 'src/posts/entity/Post.entity';
import { User } from 'src/users/entity/User.entity';

@ObjectType({ isAbstract: true })
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  user: User;
}
