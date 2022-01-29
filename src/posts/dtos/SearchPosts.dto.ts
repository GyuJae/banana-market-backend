import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@InputType()
export class SearchPostsInput {
  @Field(() => String)
  keyword: string;
}

@ObjectType()
export class SearchPostsOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
