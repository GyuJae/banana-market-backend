import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Message } from '../entity/Message.entity';

@InputType()
export class ShowMessagesInput {
  @Field(() => Int)
  roomId: number;
}

@ObjectType()
export class ShowMessagesOutput extends CoreOutput {
  @Field(() => [Message], { nullable: true })
  messages?: Message[] | null;
}
