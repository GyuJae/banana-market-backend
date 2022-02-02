import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsString } from 'class-validator';

@ObjectType({ isAbstract: true })
export class User {
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
  email: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => String, { nullable: true })
  @IsString()
  avatar?: string | null;
}
