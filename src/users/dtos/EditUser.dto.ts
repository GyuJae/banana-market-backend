import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { CreateAccountInput } from './CreateAccount.dto';

@InputType()
export class EditUserInput extends PartialType(
  PickType(CreateAccountInput, ['location', 'name', 'password'], InputType),
) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {}
