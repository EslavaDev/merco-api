import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { Crud, ParsedRequest, CrudRequest, CrudRequestInterceptor, getFeature, Override, CrudController } from '@nestjsx/crud';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Crud({
  model: {
    type: Order
  }
})
@Controller('orders')
export class OrdersController {
  constructor(public service: OrdersService) {}

  get base(): CrudController<Order> {
    return this;
  }
  
  
  @UseInterceptors(CrudRequestInterceptor)
  @Post()
  async createOneCopy( @ParsedRequest() req: CrudRequest,
   @Body() data: Order){
    try {
      return await this.service.createOne(req, data).catch(e => {
        console.log(e)
      })
      
    } catch (error) {
      return {
        message: 'error pendejo'
      }
    }
    
  }

}
