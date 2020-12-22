import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from 'src/database/models/todo.model';
import { UserModel } from 'src/database/models/user.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  public async getAll(user: UserModel) {
    const todos = await TodoModel.query().where({
      userId: user.id,
    });

    return todos;
  }

  public async getOne(user: UserModel, id: number) {
    const todo = await TodoModel.query().findOne({
      userId: user.id,
      id,
    });

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  public async create(user: UserModel, data: CreateTodoDto) {
    const todo = await TodoModel.query().insert({
      userId: user.id,
      ...data,
      isDone: data.isDone ?? false,
    });

    return todo;
  }

  public async update(user: UserModel, data: UpdateTodoDto) {
    const todo = await this.getOne(user, data.id);
    await todo
      .$query()
      .update({
        ...data,
        updatedAt: new Date(),
      })
      .skipUndefined();

    return todo;
  }

  public async delete(user: UserModel, id: number) {
    const todo = await this.getOne(user, id);
    await todo.$query().delete();
    return 'ok';
  }
}
