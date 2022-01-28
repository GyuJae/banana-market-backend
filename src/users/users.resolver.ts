import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/CreateAccount.dto';
import { EditUserInput, EditUserOutput } from './dtos/EditUser.dto';
import { LoginInput, LoginOutput } from './dtos/Login.dto';
import { User } from './entity/User.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() currentUser: User): Promise<User> {
    return this.userService.findById(currentUser);
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

  @Mutation(() => EditUserOutput)
  @UseGuards(GqlAuthGuard)
  async editUser(
    @Args('input') editUserInput: EditUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<EditUserOutput> {
    return this.userService.editUser(editUserInput, currentUser);
  }
}
