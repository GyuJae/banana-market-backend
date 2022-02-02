import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail } from 'class-validator';

@ObjectType({ isAbstract: true })
export class Hashtag {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => String)
  @IsEmail()
  hashtag: string;
}
