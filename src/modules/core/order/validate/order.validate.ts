import { keysOfTrouserInformation } from './../models/order.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { INTERNAL_SERVER_ERROR } from 'src/modules/shared/constants/error';
import { CreateOrderDTO, ItemDTO } from '../dto/order.dto';
import { ItemType } from '@prisma/client';
import { Chest, keysOfSuitInformation } from '../models/order.model';
import { isNumber } from 'class-validator';
import { isEnum } from '@nestjs/class-validator';
@Injectable()
export class OrderValidate {
  constructor(private readonly prismaService: PrismaService) {}

  async validateBeforeOrder(createOrder: CreateOrderDTO) {
    try {
      const { items } = createOrder;
      let status = true;
      const message = items.map((value) => {
        const result = this.validatePerItem(value);
        if (result.length > 0) status = false;
        return result;
      });
      return { status, message };
    } catch (error) {
      console.log('🚀 ~ file: order.validate.ts:12 ~ OrderService ~:', error);
      throw INTERNAL_SERVER_ERROR;
    }
  }

  validatePerItem = (item: ItemDTO) => {
    const { type, itemInformation } = item;
    const messages: string[] = [];
    try {
      switch (type) {
        case ItemType.SHIRT:
          keysOfSuitInformation.forEach((key) => {
            if (!itemInformation[key]) messages.push(this.buildMessage(key));
            const condition = this.validateSuitItem(itemInformation[key], key);
            if (condition) messages.push(condition);
          });
          break;
        case ItemType.SUIT:
          keysOfSuitInformation.forEach((key) => {
            if (!itemInformation[key]) messages.push(this.buildMessage(key));
            const condition = this.validateSuitItem(itemInformation[key], key);
            if (condition) messages.push(condition);
          });
          break;
        case ItemType.TROUSER:
          keysOfTrouserInformation.forEach((key) => {
            if (!itemInformation[key]) messages.push(this.buildMessage(key));
            const condition = this.validateTrouserItem(
              itemInformation[key],
              key,
            );
            if (condition) messages.push(condition);
          });
          break;
        default:
          break;
      }
      return messages;
    } catch (error) {
      return;
    }
  };

  validateSuitItem = (
    value: any,
    key: keysOfSuitInformation,
  ): null | string => {
    const messages = `${key} is not invalid`;
    switch (key) {
      case 'chestType':
        if (!isEnum(value, Chest)) {
          return messages;
        }
        break;
      case 'butt':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'calfArm':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'chest':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'downShoulder':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'gile':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'handDoor':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'longArm':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'longShirt':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'lowerWaist':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'neck':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'shoulder':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'withinArmpit':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      default:
        break;
    }
    return null;
  };

  validateTrouserItem = (
    value: any,
    key: keysOfTrouserInformation,
  ): null | string => {
    const messages = `${key} is not invalid`;
    switch (key) {
      case 'belly':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'bottom':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'butt':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'calfLeg':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'femoral':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'knee':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'longTrouser':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      case 'pipe':
        if (!isNumber(value)) {
          return messages;
        }
        break;
      default:
        break;
    }
  };

  buildMessage = (key: string) => {
    return `${key} must not empty`;
  };
}
