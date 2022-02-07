import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/CreateAccount.dto';
import * as bcrypt from 'bcrypt';
import { LoginInput, LoginOutput } from './dtos/Login.dto';
import { AuthService } from 'src/auth/auth.service';
import { EditUserInput, EditUserOutput } from './dtos/EditUser.dto';
import { User } from './entity/User.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  async createAccount({
    email,
    password,
    location,
    name,
    lat,
    lon,
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
          lat,
          lon,
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
          ok: false,
          error: 'This Email does not exist.',
        };
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          ok: false,
          error: 'This password is wrong.',
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

  async editUser(
    { password, name, location, avatar, lat, lon }: EditUserInput,
    currentUser: User,
  ): Promise<EditUserOutput> {
    try {
      let hashPassword: string;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }
      await this.prismaService.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          name: name ? name : currentUser.name,
          password: password ? hashPassword : currentUser.password,
          location: location ? location : currentUser.location,
          avatar: avatar ? avatar : currentUser.avatar,
          lat: lat ? lat : currentUser.lat,
          lon: lon ? lon : currentUser.lon,
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
}
