import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';
import { ItemType } from '@prisma/client';
import { SuitInformation, TrouserInformation } from '../models/order.model';

export class CreateOrderDTO {
  @IsOptional()
  items: ItemDTO[];

  @IsOptional()
  note: string;

  @IsNotEmpty()
  deadline: Date;
}

export class ItemDTO {
  quantity: number;
  type: ItemType;
  itemInformation: SuitInformation | TrouserInformation;
}
