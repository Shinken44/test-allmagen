import { Controller, Get, Query } from '@nestjs/common';
import { Table } from '../interface';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}
  @Get()
  async get(
    @Query('field') field: 'mm_dma' | 'site_id',
    @Query('tag') tag: string,
  ): Promise<Table[]> {
    return await this.tablesService.get(field, tag);
  }
}
