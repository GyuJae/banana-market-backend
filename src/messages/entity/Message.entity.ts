import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Post } from 'src/posts/entity/Post.entity';
import { User } from 'src/users/entity/User.entity';

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

  @Field(() => Post)
  post: Post;

  @Field(() => Int)
  @IsNumber()
  postId: number;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => [User])
  users: User[];
}

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

  @Field(() => User)
  user: User;

  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field(() => MessageRoom)
  messageRoom: MessageRoom;

  @Field(() => Int)
  @IsNumber()
  messageRoomId: number;

  @Field(() => String)
  @IsString()
  payload: string;
}
