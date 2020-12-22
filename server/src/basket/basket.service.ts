import { Injectable, BadRequestException } from '@nestjs/common';
import { BasketModel } from '../database/models/basket';
import { UserModel } from '../database/models/user.model';

@Injectable()
export class BasketService {
  public async add(user: UserModel, todoId: number) {
    let basket = await BasketModel.query().findOne({
      userId: user.id,
      todoId,
    });

    if (!basket) {
      return BasketModel.query().insert({
        userId: user.id,
        todoId,
        quantity: 1,
      });
    }

    return basket.$query().update({
      quantity: basket.quantity + 1,
    });
  }

  public async remove(user: UserModel, todoId: number) {
    let basket = await BasketModel.query().findOne({
      userId: user.id,
      todoId,
    });

    if (!basket) {
      throw new BadRequestException();
    }

    if (basket.quantity === 1) {
      return basket.$query().delete();
    }

    return basket.$query().update({
      quantity: basket.quantity - 1,
    });
  }

  public async delete(user: UserModel, todoId: number) {}

  public async clear(user: UserModel) {
    await BasketModel.query().delete().where({
      userId: user.id,
    });

    return 'ok';
  }
}
