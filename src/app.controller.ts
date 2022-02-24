import { Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ClientsService } from './clients/clients.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,
              private clientsService: ClientsService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req): any{
    return this.authService.login(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any {
    return req.user;
  }

  @Get('/confirmation/:token')
  async confirmEmail(@Param('token') token: string){
    const result = await this.clientsService.ValidateEmail(token);
    return result;
  }
}
