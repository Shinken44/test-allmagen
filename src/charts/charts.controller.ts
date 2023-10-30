import { Controller, Get, Query } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { Chart } from '../interface';

@Controller('charts')
export class ChartsController {
  constructor(private chartService: ChartsService) {}
  @Get()
  async get(
    @Query('tag') tag: string,
    @Query('interval') interval: number,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ): Promise<Chart[]> {
    return await this.chartService.get(tag, interval, startTime, endTime);
  }
}
