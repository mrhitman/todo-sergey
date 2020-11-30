import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoModel } from './database/models/todo.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getHello(): Promise<string> {
    await TodoModel.query().insert({
      name: 'test',
    });

    return this.appService.getHello();
  }
}
