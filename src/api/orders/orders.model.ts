
import { Column, Entity, ManyToOne, JoinTable, JoinColumn, } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from '../../commons/base-model';
import { User } from '../users/users.model';
import { Market } from '../markets/markets.model';

@Entity({ name: 'orders' })
export class Order extends BaseModel {
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'price' })
  public price: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'status_dispatch'})
  public status_dispatch: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'status_payment'})
  public status_payment: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'address'})
  public address: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'payment_method' })
  public payment_method: string;

  @ManyToOne(type => Market, market => market.orders)
  @JoinColumn()
  market: Market;

  @ManyToOne(type => User, user => user.orders)
  @JoinColumn()
  user: User;

}
