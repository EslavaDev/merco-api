import { Controller, Get, Request, Post, UseGuards, UseFilters, Body, ForbiddenException, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../../commons/http-exception';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login( @Body() body) {
    console.log(body)
    const user = await this.authService.validateUser(body.token);
    if (!user) {
      throw new ForbiddenException();
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('role', ['admin', 'market', 'customer'])
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req.sub)
  }
}