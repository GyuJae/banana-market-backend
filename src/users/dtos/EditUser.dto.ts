import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { CreateAccountInput } from './CreateAccount.dto';

@InputType()
export class EditUserInput extends PartialType(
  PickType(
    CreateAccountInput,
    ['location', 'name', 'password', 'lat', 'lon'],
    InputType,
  ),
) {
  @Field(() => String, { nullable: true })
  avatar?: string | null;
}

@ObjectType()
export class EditUserOutput extends CoreOutput {}
