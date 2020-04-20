import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { Market } from '../markets/markets.model';
import { MarketsService } from '../markets/markets.service';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [MarketsModule, TypeOrmModule.forFeature([ Market ]),  TypeOrmModule.forFeature([ User ]) ],
  controllers: [ UsersController ],
  providers: [ UsersService, MarketsService ],
  exports: [UsersService]
})
export class UsersModule {}
