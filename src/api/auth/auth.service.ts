import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validateUser(token: string): Promise<any> {
    console.log(token, 'hola')
    const {uid} = await admin.auth().verifyIdToken(token);
    const user: User = await this.usersService.findOne({where: {uuid: uid}});
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: User): Promise<any> {
    const user = await this.usersService.create(data);
    return user
  }
}