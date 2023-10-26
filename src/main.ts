import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import ImpressionQuery from './database/impression-query';
import EventQuery from './database/event-query';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csvtojson');

async function fillData() {
  const impressions = await ImpressionQuery.get();

  if (impressions.length === 0) {
    const csvDisplayList = `${config.get('dataFolder')}interview.X.csv`;
    const csvEventList = `${config.get('dataFolder')}interview.Y.csv`;

    const displayList = await csv().fromFile(csvDisplayList);
    const eventList = await csv().fromFile(csvEventList);

    await ImpressionQuery.save(displayList);
    await EventQuery.save(eventList);
  }
}
async function bootstrap() {
  await fillData();

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Allmagen open API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('port'));
}

bootstrap().catch((e) => console.log(e));
