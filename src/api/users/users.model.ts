import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { BaseModel } from '../../commons/base-model';
import { Market } from '../markets/markets.model';
import { Order } from '../orders/orders.model';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name' })
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Column('int', { name: 'role', default: 1 })
  public role: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'password' })
  public password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column('varchar', { name: 'email', unique: true })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'phone' })
  public phone: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'photo', default: 'none' })
  public photo: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'uuid', unique: true })
  public uuid: string;

  @ManyToOne(type => Market, market => market.users)
  @JoinColumn()
  market: Market;

  @OneToMany(type => Order, order => order.user)
  @JoinColumn()
  orders: Order[];
}
