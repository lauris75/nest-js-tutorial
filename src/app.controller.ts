import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Req() request: Request): any{
    console.log(request.body.client);
    return request.body.client;
  }

  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
