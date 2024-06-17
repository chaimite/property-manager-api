import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleStrategyService } from './google.strategy.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleStrategyController {
  constructor(private readonly appService: GoogleStrategyService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}
