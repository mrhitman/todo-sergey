import { Model } from 'objection';

export enum UserState {
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  deactivated = 'deactivated',
}

export class UserModel extends Model {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public state: UserState;
  public createdAt: number;
  public updatedAt: number;

  static get tableName() {
    return 'user';
  }
}
