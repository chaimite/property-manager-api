import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './features/properties/properties.module';
import { PrismaModule } from '../prisma/client/prisma.module';
import { ExpensesModule } from './features/expenses/expenses.module';
import { IncomeModule } from './features/income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PropertiesModule,
    PrismaModule,
    ExpensesModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
