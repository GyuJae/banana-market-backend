import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllUserOutput } from './dtos/AllUser.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/CreateAccount.dto';
import { LoginInput, LoginOutput } from './dtos/Login.dto';
import { User } from './entity/User.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => AllUserOutput)
  async allUser(): Promise<AllUserOutput> {
    return this.userService.allUser();
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }
}
