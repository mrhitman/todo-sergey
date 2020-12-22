import { Model } from 'objection';

export class TodoModel extends Model {
  public id: number;
  public name: string;
  public isDone: boolean;
  public userId: number;
  public createdAt: Date;
  public updatedAt: Date;

  static get tableName() {
    return 'todo';
  }
}
