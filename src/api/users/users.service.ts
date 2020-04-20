import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './users.model';
import { Market } from '../markets/markets.model';
import { MarketsService } from '../markets/markets.service';
import admin = require('firebase-admin');

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private readonly marketService: MarketsService,
  ) {
    super(repo);
  }

  public async create(body: User) {
    const { uid } = await admin
      .auth()
      .createUser({
        email: body.email,
        password: body.password,
        displayName: body.name,
      });
    const user = await this.repo.save({ ...body, role: '1', uuid: uid });
    return this.repo.findOneOrFail(user.id);
  }

  public async asigneMarket(id: number, marketId: number) {
    const market: Market = await this.marketService.findOne(marketId);
    await this.repo.update(id, { market });
    return await this.repo.findOneOrFail(id, { relations: ['market'] });
  }

  // U
  public async update(id: number, data: User) {
    await this.repo.update({ id }, data);
    return await this.repo.findOneOrFail(id);
  }
}
