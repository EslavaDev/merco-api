import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column('boolean', { name: 'is_enabled', default: true })
  public isEnabled: boolean;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true })
  public updatedAt: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  public createdAt: string;
}
