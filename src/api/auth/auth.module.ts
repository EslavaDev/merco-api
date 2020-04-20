import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Market } from '../markets/markets.model';
import { MarketsModule } from '../markets/markets.module';
import { MarketsService } from '../markets/markets.service';

@Module({
  imports: [
    MarketsModule, TypeOrmModule.forFeature([ Market ]), 
      UsersModule,
    TypeOrmModule.forFeature([ User ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AuthController],
  providers: [MarketsService, UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}