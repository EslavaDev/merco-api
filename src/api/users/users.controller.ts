import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Request,
  SetMetadata,
  Put,
} from '@nestjs/common';
import {
  Crud,
  ParsedRequest,
  ParsedBody,
  CrudRequest,
  CrudRequestInterceptor,
  getFeature,
  Override,
  CrudController,
} from '@nestjsx/crud';
import { User } from './users.model';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Post()
  createOneCopy(@Body() data: User) {
    return this.service.create(data);
  }
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(CrudRequestInterceptor)
  @Get()
  getAll(@Request() req) {
    console.log(req.user);
    return this.service.find();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin', 'market', 'customer'])
  @UseInterceptors(CrudRequestInterceptor)
  @Put('')
  updateUser(@Request() req, @Body() body) {
    delete body.role;
    delete body.isEnabled;
    delete body.email;
    delete body.id;
    return this.service.update(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin'])
  @UseInterceptors(CrudRequestInterceptor)
  @Put(':id')
  updateUserForAdmin(@Param() params, @Body() body) {
    return this.service.update(params.id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin'])
  @UseInterceptors(CrudRequestInterceptor)
  @Post('assigne-market')
  updateAssigneMarket(@Request() req, @Body() body) {
    console.log(body);
    return this.service.asigneMarket(
      body.user ? body.user : req.user.id,
      body.marketId,
    );
    // return body
  }
}
