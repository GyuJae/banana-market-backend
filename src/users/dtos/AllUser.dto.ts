import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/User.entity';

@ObjectType()
export class AllUserOutput {
  @Field(() => [User], { nullable: true })
  users?: User[] | null;
}
