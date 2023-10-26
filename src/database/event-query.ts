import db from './db';
import { Event } from './models';
import Helper from '../helper';

export default class EventQuery {
  public static async get(tag: string) {
    try {
      return await db.query(
        `
          SELECT * FROM event
          JOIN impression ON event.uid = impression.uid
          WHERE event.tag = $1
        `,
        [tag],
      );
    } catch (e) {
      throw new Error(`EventQuery.get: ${e.message}`);
    }
  }
  public static async save(data: Event[]) {
    try {
      let sql = '';

      data.forEach((event) => {
        const keys = Object.keys(event);
        const values = Object.values(event).map((value) => {
          return Helper.getCorrect(value);
        });

        sql += `
          INSERT INTO event (${keys})
          VALUES (${values})
          ON CONFLICT (uid) DO NOTHING;
        `;
      });

      if (sql) {
        await db.query(sql);
      }
    } catch (e) {
      throw new Error(`EventQuery.save: ${e.message}`);
    }
  }
}
