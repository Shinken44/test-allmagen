import { Injectable } from '@nestjs/common';
import { Table } from '../interface';
import TableQuery from '../database/table-query';
import Helper from '../helper';

@Injectable()
export class TablesService {
  async get(
    field: 'mm_dma' | 'site_id',
    tag: string,
    limit: number,
    offset: number,
  ): Promise<Table[]> {
    try {
      const tableDate = await TableQuery.get(field, tag, limit, offset);

      console.log(tableDate.length);

      return tableDate.map((data) => {
        const click_count = tag[0] !== 'v' ? data.event_count : 0;

        const CTR = Helper.calcCTR(data.impression_count, click_count);
        const EvPM = Helper.calcCTR(data.impression_count, data.event_count);

        return {
          ...data,
          click_count,
          CTR,
          EvPM,
        };
      });
    } catch (e) {
      throw new Error(`TablesService.get: ${e.message}`);
    }
  }
}
