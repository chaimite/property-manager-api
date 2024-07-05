import { Module } from '@nestjs/common';
import { GoogleStrategyController } from './google.strategy.controller';
import { GoogleStrategyService } from './google.strategy.service';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }), AuthModule],
  controllers: [GoogleStrategyController],
  providers: [GoogleStrategyService, GoogleStrategy],
})
export class GoogleStrategyModule {}
