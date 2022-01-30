import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';

@InputType()
export class ToggleLikeInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class ToggleLikeOutput extends CoreOutput {}
