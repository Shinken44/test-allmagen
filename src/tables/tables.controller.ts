import { Controller, Get, Query } from '@nestjs/common';
import { Table } from '../interface';
import { TablesService } from './tables.service';
import { FieldEnum } from '../enum/field-enum';

@Controller('tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}
  @Get()
  async get(
    @Query('field') field: FieldEnum = FieldEnum.mm_dma,
    @Query('tag') tag: string = 'fclick',
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
  ): Promise<Table[]> {
    return await this.tablesService.get(field, tag, limit, offset);
  }
}
