import {
  Column,
  Entity,
  ManyToOne,
  JoinTable,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from '../../commons/base-model';
import { User } from '../users/users.model';
import { Market } from '../markets/markets.model';

@Entity({ name: 'products' })
export class Product extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name' })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'sku' })
  public sku: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'price' })
  public price: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'unit_type' })
  public unit_type: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'image' })
  public image: string;

  @IsString()
  @Column('varchar', { name: 'discount_price' })
  public discount_price: string;

  @IsString()
  @Column('boolean', { name: 'discount_show', default: false })
  public discount_show: boolean;

  @IsString()
  @Column('varchar', { name: 'variants', array: true } )
  public variants: string[];

  @IsNotEmpty()
  @ManyToOne(type => Market, market => market.products)
  @JoinColumn()
  market: Market;
}
