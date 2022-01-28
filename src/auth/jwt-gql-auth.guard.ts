import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (ctx.getContext().req.headers.hasOwnProperty('x-jwt')) {
      const token = ctx.getContext().req.headers['x-jwt'];
      const user = await this.authService.verify(token);
      if (user) {
        const gqlContext = ctx.getContext();
        gqlContext['user'] = user;
        return true;
      }
    }
    return false;
  }
}
