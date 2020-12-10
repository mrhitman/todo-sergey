import { Model } from 'objection';

export enum UserState {
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  deactivated = 'deactivated',
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
  superAdmin = 'super-admin',
}

export class UserModel extends Model {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public state: UserState;
  public role: UserRole;
  public createdAt: number;
  public updatedAt: number;

  static get tableName() {
    return 'user';
  }
}
