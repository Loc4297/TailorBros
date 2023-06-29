export enum Chest {
  T = 'T',
  S = 'S',
}

export interface SuitInformation {
  shoulder: number;
  longShirt: number;
  calfArm: number;
  neck: number;
  gile: number;
  chestType: Chest;
  downShoulder: number;
  longArm: number;
  withinArmpit: number;
  chest: number;
  butt: number;
  handDoor: number;
  lowerWaist: number;
}

export interface TrouserInformation {
  belly: number;
  femoral: number;
  pipe: number;
  bottom: number;
  butt: number;
  knee: number;
  longTrouser: number;
  calfLeg: number;
}
