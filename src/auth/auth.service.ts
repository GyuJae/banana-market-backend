import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async verify(token: string): Promise<User> {
    const { id } = this.jwtService.verify(token);
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  async sign(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
