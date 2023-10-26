import db from './db';
import Helper from '../helper';
import { Impression } from './models';

export default class ImpressionQuery {
  public static async get(): Promise<Impression[]> {
    try {
      return await db.query(`
        SELECT * FROM impression WHERE reg_time IS NOT null
        ORDER BY reg_time DESC
      `);
    } catch (e) {
      throw new Error(`ImpressionQuery.get: ${e.message}`);
    }
  }
  public static async save(data: any[]) {
    try {
      let sql = '';

      data.forEach((impression) => {
        const keys = Object.keys(impression);
        const values = Object.values(impression).map(
          (value: string, index: number) => {
            if (keys[index] === 'reg_time' && Number.isNaN(Date.parse(value))) {
              return 'null';
            } else {
              return Helper.getCorrect(value);
            }
          },
        );

        sql += `
          INSERT INTO impression (${keys})
          VALUES (${values})
          ON CONFLICT (uid) DO NOTHING;
        `;
      });

      if (sql) {
        await db.query(sql);
      }
    } catch (e) {
      throw new Error(`ImpressionQuery.save: ${e.message}`);
    }
  }
}
