import { IsEnum, IsNotEmpty, IsNumber } from '@nestjs/class-validator';

export enum Chest {
  T = 'T',
  S = 'S',
}

export class SuitInformation {
  @IsNotEmpty()
  @IsNumber()
  shoulder: number;

  @IsNotEmpty()
  @IsNumber()
  longShirt: number;

  @IsNotEmpty()
  @IsNumber()
  calfArm: number;

  @IsNotEmpty()
  @IsNumber()
  neck: number;

  @IsNotEmpty()
  @IsNumber()
  gile: number;

  @IsNotEmpty()
  chestType: string;

  @IsNotEmpty()
  @IsNumber()
  downShoulder: number;

  @IsNotEmpty()
  @IsNumber()
  longArm: number;

  @IsNotEmpty()
  @IsNumber()
  withinArmpit: number;

  @IsNotEmpty()
  @IsNumber()
  chest: number;

  @IsNotEmpty()
  @IsNumber()
  butt: number;

  @IsNotEmpty()
  @IsNumber()
  handDoor: number;

  @IsNotEmpty()
  @IsNumber()
  lowerWaist: number;
}

export const keysOfSuitInformation: (keyof SuitInformation)[] = [
  'butt',
  'calfArm',
  'chest',
  'downShoulder',
  'gile',
  'handDoor',
  'longArm',
  'longShirt',
  'lowerWaist',
  'neck',
  'shoulder',
  'withinArmpit',
  'chestType',
];

export type keysOfSuitInformation = keyof SuitInformation;

export class TrouserInformation {
  @IsNotEmpty()
  @IsNumber()
  belly: number;

  @IsNotEmpty()
  @IsNumber()
  femoral: number;

  @IsNotEmpty()
  @IsNumber()
  pipe: number;

  @IsNotEmpty()
  @IsNumber()
  bottom: number;

  @IsNotEmpty()
  @IsNumber()
  butt: number;

  @IsNotEmpty()
  @IsNumber()
  knee: number;

  @IsNotEmpty()
  @IsNumber()
  longTrouser: number;

  @IsNotEmpty()
  @IsNumber()
  calfLeg: number;
}

export const keysOfTrouserInformation: (keyof TrouserInformation)[] = [
  'butt',
  'belly',
  'bottom',
  'calfLeg',
  'femoral',
  'knee',
  'longTrouser',
  'pipe',
];

export type keysOfTrouserInformation = keyof TrouserInformation;
