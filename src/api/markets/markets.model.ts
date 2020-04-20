import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsJSON,
} from 'class-validator';
import { BaseModel } from '../../commons/base-model';
import { User } from '../users/users.model';
import { Product } from '../products/products.model';
import { Order } from '../orders/orders.model';

@Entity({ name: 'markets' })
export class Market extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name' })
  public name: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Column({ name: 'banners', type: String, array: true })
  public banners: string[];

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'description' })
  public description: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'photo', default: 'none' })
  public photo: string;

  // @IsJSON()
  @Column('json', { name: 'code' })
  public code: string;

  @OneToMany(type => Product, product => product.market)
  @JoinColumn()
  products: Product[];

  // @ManyToMany(type => User, user => user.market, {})
  // @JoinTable()
  @OneToMany(type => User, user => user.market)
  @JoinColumn()
  users: User[];

  @OneToMany(type => Order, order => order.market)
  @JoinColumn()
  orders: Order[];
}
