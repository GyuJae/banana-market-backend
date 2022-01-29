import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@InputType()
export class ReadPostInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class ReadPostOutput extends CoreOutput {
  @Field(() => Post, { nullable: true })
  post?: Post | null;
}
