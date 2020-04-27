import { Controller, Get, Request, Post, UseGuards, UseFilters, Body, ForbiddenException, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';
import { CrudRequestInterceptor } from '@nestjsx/crud';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('verify')
  async login( @Body() body) {
    console.log(body)
    const user = await this.authService.validateUser(body.token);
    if (!user) {
      throw new ForbiddenException();
    }
    return user
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Post('register')
  getProfile(@Body() data: User) {
    return this.authService.register(data)
  }
}