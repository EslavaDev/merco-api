import { Module } from '@nestjs/common';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './markets.model';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Market ])],
  controllers: [ MarketsController ],
  providers: [ MarketsService ],
  exports: [MarketsService]
})
export class MarketsModule {}
