import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { roleDictionary } from './role.dictionary';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'your role is not valid'
      }, 403);
    }
    const request = context.switchToHttp().getRequest();
    const user: Record<string, string | number> = request.user;
    const roleUser = roleDictionary(user.role as number)
    const hasRole = () => role.includes(roleUser);
    if(user && user.role && hasRole()){
      return true;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'your role is not valid'
      }, 403)
    }
  }
}
