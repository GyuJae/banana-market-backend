import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { Post } from '../entity/Post.entity';

@InputType()
export class CreatePostInput extends PickType(
  Post,
  ['title', 'location', 'description', 'price', 'lat', 'lon'],
  InputType,
) {
  @Field(() => String, { nullable: true })
  hashtagInput?: string | null;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {}
