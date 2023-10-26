import db from './db';
import { TableData } from '../interface';

export default class TableQuery {
  public static async get(
    field: 'mm_dma' | 'site_id',
    tag: string,
  ): Promise<TableData[]> {
    try {
      return await db.query(
        `
          SELECT 
            COUNT(impression.uid) AS impression_count,
            COUNT(event.uid) AS event_count,
            impression.${field}
          FROM impression 
          LEFT OUTER JOIN event on impression.uid = event.uid AND event.tag = $2
          WHERE impression.reg_time IS NOT null
          GROUP BY ${field}
        `,
        [field, tag],
      );
    } catch (e) {
      throw new Error(`TableQuery.get: ${e.message}`);
    }
  }
}
