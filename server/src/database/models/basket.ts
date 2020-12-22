import { Model } from 'objection';

export class BasketModel extends Model {
  public id: number;
  public todoId: number;
  public quantity: number;
  public userId: number;
  public createdAt: Date;
  public updatedAt: Date;

  static get tableName() {
    return 'basket';
  }
}
