import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';

@InputType()
export class SendMessageInput {
  @Field(() => Int, { nullable: true })
  roomId?: number | null;

  @Field(() => String)
  payload: string;

  @Field(() => Int, { nullable: true })
  postId?: number;
}

@ObjectType()
export class SendMessageOutput extends CoreOutput {}
