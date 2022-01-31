import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';

@InputType()
export class sendMessageInput {
  @Field(() => Int)
  roomId: number;

  @Field(() => String)
  payload: string;
}

@ObjectType()
export class sendMessageOutput extends CoreOutput {}
