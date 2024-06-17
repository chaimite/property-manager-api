import { Module } from '@nestjs/common';
import { GoogleStrategyController } from './google.strategy.controller';
import { GoogleStrategyService } from './google.strategy.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [GoogleStrategyController],
  providers: [GoogleStrategyService, GoogleStrategy],
})
export class GoogleStrategyModule {}
