import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@ObjectType({ isAbstract: true })
export class Message {
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
  userId: number;

  @Field(() => Int)
  @IsNumber()
  messageRoomId: number;

  @Field(() => String)
  @IsString()
  payload: string;
}
