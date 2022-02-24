import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { HealthModule } from './controllers/health/health.module';
import { ReportModule } from './controllers/report/report.module';

@Module({
  imports: [
    HealthModule,
    ReportModule,
    HttpModule,
    ScheduleModule.forRoot()
  ]
})
export class AppModule { }
