import { Model } from 'objection';

export class TodoModel extends Model {
  public id: number;
  public name: string;
  public isDone: boolean;
  public userId: number;
  public createdAt: number;
  public updatedAt: number;

  static get tableName() {
    return 'todo';
  }
}
