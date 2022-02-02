import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString, IsNumber } from 'class-validator';

@ObjectType({ isAbstract: true })
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;

  @Field(() => Boolean)
  @IsBoolean()
  soldOut: boolean;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => Float)
  @IsNumber()
  lat: number;

  @Field(() => Float)
  @IsNumber()
  lon: number;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Int)
  @IsInt()
  price: number;

  @Field(() => [String], { nullable: true })
  @IsString()
  files?: string[] | null;

  @Field(() => Int)
  @IsInt()
  viewCount: number;

  @Field(() => Int)
  @IsInt()
  authorId: number;
}
