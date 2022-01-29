import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';

@InputType()
export class EditPostInput {
  @Field(() => Int)
  postId: number;

  @Field(() => Boolean, { nullable: true })
  soldOut?: boolean | null;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  location?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Number, { nullable: true })
  price?: number | null;

  @Field(() => String, { nullable: true })
  hashtagInput?: string | null;
}

@ObjectType()
export class EditPostOutput extends CoreOutput {}
