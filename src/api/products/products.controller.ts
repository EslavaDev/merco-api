import { Controller, Post, Body, UseInterceptors, UseGuards, SetMetadata } from '@nestjs/common';
import { Crud, ParsedRequest, CrudRequest, CrudRequestInterceptor, getFeature, Override, CrudController } from '@nestjsx/crud';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: {
    type: Product
  }
})
@Controller('products')
export class ProductsController {
  constructor(public service: ProductsService) {}

  get base(): CrudController<Product> {
    return this;
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['market'])
  @UseInterceptors(CrudRequestInterceptor)
  @Post()
  async createOneCopy( @ParsedRequest() req: CrudRequest,
   @Body() data: Product){
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
