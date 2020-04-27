import { Controller, Get, Request, Post, UseGuards, UseFilters, Body, ForbiddenException, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';
import { CrudRequestInterceptor } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('verify')
  async login( @Body() body) {
    const user = await this.authService.validateUser(body.token);
    if (!user) {
      throw new ForbiddenException();
    }
    return user
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Post('register')
  register(@Body() data: User) {
    return this.authService.register(data)
  }


  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @SetMetadata('role', ['admin', 'market', 'customer'])
  @Get('profile')
  getProfile(@Request() req) {
    console.log('validacion')
    return req.sub
  }
}