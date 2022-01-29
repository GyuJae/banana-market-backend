import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@InputType()
export class ShowPostByHashtagInput {
  @Field(() => String)
  hashtag: string;
}

@ObjectType()
export class ShowPostByHashtagOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
