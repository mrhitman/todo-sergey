import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(protected readonly todoService: TodoService) {}

  @Get()
  public async all(@CurrentUser() user) {
    return this.todoService.getAll(user);
  }

  @Get('/:id')
  public async one(@CurrentUser() user, @Param('id') id: number) {
    return this.todoService.getOne(user, id);
  }

  @Post('/')
  public async create(@CurrentUser() user, @Body() data: CreateTodoDto) {
    return this.todoService.create(user, data);
  }

  @Patch('/')
  public async update(@CurrentUser() user, @Body() data: UpdateTodoDto) {
    return this.todoService.update(user, data);
  }

  @Delete('/:id')
  public async delete(@CurrentUser() user, @Param('id') id: number) {
    return this.todoService.delete(user, id);
  }
}
