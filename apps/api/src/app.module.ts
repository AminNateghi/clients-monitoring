import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { HealthModule } from './controllers/health/health.module';
import { ReportModule } from './controllers/report/report.module';

@Module({
  imports: [
    HealthModule,
    ReportModule,
    HttpModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dashboard'),
      exclude: ['/api*']
    })
  ]
})
export class AppModule { }
