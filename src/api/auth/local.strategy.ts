import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const user = await this.authService.validateUser(token);
    console.log(token)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(readonly jwtService: JwtService/*, readonly userService: UsersService*/) { }
//     canActivate(context: ExecutionContext): boolean {
//         const ctx = context.switchToHttp().getNext();
//         const request = ctx.getContext().request;
//         const Authorization = request.get('Authorization');

//         if (Authorization) {
//             const token = Authorization.replace('Bearer ', '');
//             const { userId, firstName } = this.jwtService.verify(token)  as { userId: string; firstName: string } ;

//             return !!userId;
//         }
//     }
// }