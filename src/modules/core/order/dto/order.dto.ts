import { IsOptional } from '@nestjs/class-validator';
import { ItemType } from '@prisma/client';
import { SuitInformation, TrouserInformation } from '../models/order.model';

export class CreateOrderDTO {
  @IsOptional()
  items: ItemDTO[];
  note: string;
  deadline: Date;
}

export class ItemDTO {
  quantity: number;
  type: ItemType;
  itemInfor: SuitInformation | TrouserInformation;
}
