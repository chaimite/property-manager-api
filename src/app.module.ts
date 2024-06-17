import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './features/properties/properties.module';
import { PrismaModule } from '../prisma/client/prisma.module';
import { ExpensesModule } from './features/expenses/expenses.module';
import { IncomeModule } from './features/income/income.module';
import { GoogleStrategyModule } from './features/login/strategy/google.strategy.module';

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
  ],
})
export class AppModule {}
