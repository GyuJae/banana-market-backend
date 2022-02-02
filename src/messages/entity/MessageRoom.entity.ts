import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@ObjectType({ isAbstract: true })
export class MessageRoom {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => Int)
  @IsNumber()
  postId: number;

  @Field(() => Int)
  @IsNumber()
  sellerId: number;

  @Field(() => Int)
  @IsNumber()
  buyerId: number;
}
