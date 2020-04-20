import { Controller, Get, Param, Post, Body, UseInterceptors, UseGuards, Request, SetMetadata, Put } from '@nestjs/common';
import { Crud, ParsedRequest, ParsedBody, CrudRequest, CrudRequestInterceptor, getFeature, Override, CrudController } from '@nestjsx/crud';
import { Market } from './markets.model';
import { MarketsService } from './markets.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

export interface Service<T> {
  add(entity: T): Promise<T>;
  getAll(): Promise<T[]>;
  get(id: number): Promise<T>;
  update(entity: T): Promise<T>;
  remove(entity: T): Promise<T>;
}

@Crud({
  model: {
    type: Market
  }
})
@Controller('markets')
export class MarketsController {
  constructor(public service: MarketsService) {}

  get base(): CrudController<Market> {
    return this;
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin'])
  @UseInterceptors(CrudRequestInterceptor)
  @Post()
  createOne( @ParsedRequest() req: CrudRequest,
   @Body() data: Market){

    return this.service.createOne(req, data)
    
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get()
  getAll(@Request() req){
    return this.service.find()
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get(':id')
  getByIdRelations(@Param() param){
    return this.service.getByIdWithRelation(param.id)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin', 'market'])
  @UseInterceptors(CrudRequestInterceptor)
  @Put(':id')
  updateMarket(@Param() params, @Request() req, @Body() body){
    console.log(params, req.user, body)
    // return this.service.find()
    return this.service.update(params.id, body)
  }


}
