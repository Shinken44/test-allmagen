import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import ImpressionQuery from './database/impression-query';
import config from 'config';
import csv from 'csvtojson';
import EventQuery from './database/event-query';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger('AppService');
  getHello(): string {
    return 'CTR & EvPM Analysis & Visualisation';
  }
  private async fillData() {
    const impressions = await ImpressionQuery.get(new Date(0), new Date());

    if (impressions.length === 0) {
      const csvDisplayList = `${config.get('dataFolder')}interview.X.csv`;
      const csvEventList = `${config.get('dataFolder')}interview.Y.csv`;

      const displayList = await csv().fromFile(csvDisplayList);
      const eventList = await csv().fromFile(csvEventList);

      await ImpressionQuery.save(displayList);
      await EventQuery.save(eventList);
    }
  }
  async onModuleInit() {
    try {
      await this.fillData();
    } catch (e) {
      this.logger.error(`${e.name}: ${e.message}`);
    }
  }
}
