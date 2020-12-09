import { Model } from 'objection';

export class RefreshTokenModel extends Model {
  public token: string;
  public userId: number;
  public createdAt: number;
  public updatedAt: number;

  static get idColumn() {
    return 'token';
  }

  static get tableName() {
    return 'refresh_token';
  }
}
