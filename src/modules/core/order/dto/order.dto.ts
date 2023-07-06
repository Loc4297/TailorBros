import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Min,
} from '@nestjs/class-validator';
import { ItemType } from '@prisma/client';
import { SuitInformation, TrouserInformation } from '../models/order.model';
import { MinLength } from 'class-validator';
import { Transform } from '@nestjs/class-transformer';

export class CreateOrderDTO {
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  // @MinLength(1, {
  //   each: true,
  // })
  items: ItemDTO[];

  @IsOptional()
  note: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => {
    return new Date(value);
  })
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
