import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@InputType()
export class EditPostInput extends PartialType(
  PickType(
    Post,
    ['soldOut', 'title', 'location', 'description', 'price', 'lat', 'lon'],
    InputType,
  ),
) {
  @Field(() => Int)
  postId: number;

  @Field(() => String, { nullable: true })
  hashtagInput?: string | null;
}

@ObjectType()
export class EditPostOutput extends CoreOutput {}
