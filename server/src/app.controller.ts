import { Controller, Get, Inject } from '@nestjs/common';
import * as Knex from 'knex';
import { AppService } from './app.service';
import { TodoModel } from './database/models/todo.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KnexConnection') private readonly databaseModule: Knex,
  ) {}

  @Get()
  public async getHello(): Promise<string> {
    await TodoModel.query().insert({
      name: 'test',
    });

    return this.appService.getHello();
  }

  @Get('/health')
  public async healthCheck() {
    try {
      const db = await this.databaseModule.raw('select 1');

      if (db.rowCount !== 1) {
        throw Error('Db not awailable');
      }

      return {
        db: 'ready',
      };
    } catch (e) {
      return {
        info: e.message,
      };
    }
  }
}
