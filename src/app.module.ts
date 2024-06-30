import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './features/properties/properties.module';
import { PrismaModule } from '../prisma/client/prisma.module';
import { ExpensesModule } from './features/expenses/expenses.module';
import { IncomeModule } from './features/income/income.module';
import { GoogleStrategyModule } from './features/login/strategy/google.strategy.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth/auth.module';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PropertiesModule,
    PrismaModule,
    ExpensesModule,
    IncomeModule,
    GoogleStrategyModule,
    PassportModule,
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '5m' } }),
    AuthModule,
  ],
})
export class AppModule {}
