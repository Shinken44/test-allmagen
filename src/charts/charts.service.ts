import { Injectable } from '@nestjs/common';
import { Chart } from '../interface';
import ImpressionQuery from '../database/impression-query';
import EventQuery from '../database/event-query';
import Helper from '../helper';

@Injectable()
export class ChartsService {
  async get(
    tag: string,
    interval: number,
    startTime: Date,
    endTime: Date,
  ): Promise<Chart[]> {
    try {
      let impressions = await ImpressionQuery.get(startTime, endTime);
      if (impressions.length === 0) return [];

      let events = await EventQuery.get(tag);

      const lastImpressionTime = impressions[impressions.length - 1].reg_time;

      let endPeriod = impressions[0].reg_time;
      let startPeriod = new Date(endPeriod.getTime() - interval);

      const chart: Chart[] = [];

      while (
        impressions.length > 0 &&
        lastImpressionTime < endPeriod &&
        chart.length < 30
      ) {
        const impressionCount = impressions.filter((impression) => {
          return (
            startPeriod < impression.reg_time &&
            impression.reg_time <= endPeriod
          );
        }).length;

        const eventCount = events.filter((event) => {
          return startPeriod < event.reg_time && event.reg_time <= endPeriod;
        }).length;
        const clickCount = tag[0] !== 'v' ? eventCount : 0;

        const CTR = Helper.calcCTR(impressionCount, clickCount);
        const EvPM = Helper.calcCTR(impressionCount, eventCount);

        chart.push({
          CTR: CTR ? CTR : 0,
          EvPM: EvPM ? EvPM : 0,
          time: endPeriod,
        });

        impressions = impressions.slice(impressionCount);
        events = events.slice(eventCount);

        endPeriod = startPeriod;
        startPeriod = new Date(endPeriod.getTime() - interval);
      }

      return chart;
    } catch (e) {
      throw new Error(`ChartsService.get: ${e.message}`);
    }
  }
}
