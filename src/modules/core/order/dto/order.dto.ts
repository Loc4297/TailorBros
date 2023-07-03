import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Min,
} from '@nestjs/class-validator';
import { ItemType } from '@prisma/client';
import { SuitInformation, TrouserInformation } from '../models/order.model';

export class CreateOrderDTO {
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  items: ItemDTO[];

  @IsOptional()
  note: string;

  @IsNotEmpty()
  deadline: Date;
}

export class UpdateOrderDTO {
  // @IsOptional()
  // items: ItemDTO[];

  @IsOptional()
  note: string;

  @IsOptional()
  deadline: Date;
}

export class ItemDTO {
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  type: ItemType;

  @IsNotEmpty()
  itemInformation: SuitInformation | TrouserInformation;
}
