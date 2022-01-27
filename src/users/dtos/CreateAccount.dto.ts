import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/CoreOutput.dto';
import { User } from '../entity/User.entity';

@InputType()
export class CreateAccountInput extends PickType(
  User,
  ['email', 'password', 'location', 'name'],
  InputType,
) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
