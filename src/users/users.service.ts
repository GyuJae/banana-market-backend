import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllUserOutput } from './dtos/AllUser.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/CreateAccount.dto';
import * as bcrypt from 'bcrypt';
import { LoginInput, LoginOutput } from './dtos/Login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async allUser(): Promise<AllUserOutput> {
    const users = await this.prismaService.user.findMany();
    return {
      users,
    };
  }

  async createAccount({
    email,
    password,
    location,
    name,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const emailExist = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });
      if (emailExist) {
        return {
          ok: false,
          error: 'This email already exist.',
        };
      }
      const nameExist = await this.prismaService.user.findUnique({
        where: {
          name,
        },
        select: {
          id: true,
        },
      });
      if (nameExist) {
        return {
          ok: false,
          error: 'This name already exist.',
        };
      }

      const hashPassword = await bcrypt.hash(password, 10);
      await this.prismaService.user.create({
        data: {
          email,
          password: hashPassword,
          location,
          name,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          password: true,
          id: true,
        },
      });
      if (!user) {
        return {
          ok: true,
          token: 'This Email does not exist.',
        };
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          ok: true,
          token: 'This password is wrong.',
        };
      }
      const token = await this.authService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
