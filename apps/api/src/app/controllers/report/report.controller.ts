import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

  constructor(
    private reportService: ReportService
  ) { }

  @Get()
  getAllService(@Res() res: Response) {
    this.reportService.today().then(data => {
      return res.status(HttpStatus.OK).json(data);
    });
  }

}
