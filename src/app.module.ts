import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesController } from './tables/tables.controller';
import { ChartsController } from './charts/charts.controller';
import { ChartsService } from './charts/charts.service';
import { TablesService } from './tables/tables.service';

@Module({
  imports: [],
  controllers: [AppController, TablesController, ChartsController],
  providers: [AppService, ChartsService, TablesService],
})
export class AppModule {}
