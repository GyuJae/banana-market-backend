import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@ObjectType()
export class ShowPostsNearbyMeOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
