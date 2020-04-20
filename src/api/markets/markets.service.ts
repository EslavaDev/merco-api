import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Market } from './markets.model';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class MarketsService extends TypeOrmCrudService<Market> {
  constructor(@InjectRepository(Market) repo) {
    super(repo);
  }

    // U
    public async update(id: number, data: Market) {
        await this.repo.update({id}, data);
        return await this.repo.findOneOrFail(id,{relations:['users']});
    }

    public async getByIdWithRelation(id: number) {
      return await this.repo.findOneOrFail(id,{relations:['users']});
  }

    // D
    public async remove(Market: Market) {
        return (this.repo).remove(Market);
    }
}
