import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.model';

@Module({
  imports: [ TypeOrmModule.forFeature([ Order ]) ],
  controllers: [ OrdersController ],
  providers: [ OrdersService ]
})
export class OrdersModule {}
