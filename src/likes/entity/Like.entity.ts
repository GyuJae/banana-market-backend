import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsInt } from 'class-validator';

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

  @Field(() => Int)
  @IsInt()
  postId: number;

  @Field(() => Int)
  @IsInt()
  userId: number;
}
