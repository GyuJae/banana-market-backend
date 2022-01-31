import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (
      ctx.getContext().hasOwnProperty('req') &&
      ctx.getContext().req.headers.hasOwnProperty('x-jwt')
    ) {
      const token = ctx.getContext().req.headers['x-jwt'];
      const user = await this.authService.verify(token);

      const gqlContext = ctx.getContext();
      if (user) {
        gqlContext['user'] = user;
        return true;
      } else {
        gqlContext['uesr'] = null;
      }
    }
    if (ctx.getContext().hasOwnProperty('x-jwt')) {
      const token = ctx.getContext()['x-jwt'];
      const user = await this.authService.verify(token);
      const gqlContext = ctx.getContext();
      if (user) {
        gqlContext['user'] = user;
        return true;
      } else {
        gqlContext['uesr'] = null;
      }
    }
    return false;
  }
}
