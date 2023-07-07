import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from '@nestjs/class-validator';
import { Role } from '@prisma/client';
import { IsPhoneNumber } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';

export enum RoleUser {
  CLIENT = 'CLIENT',
  TAILOR = 'TAILOR',
  ADMIN = 'ADMIN',
}
export class TailorDTO {
  @IsNotEmpty()
  @IsString()
  name: 'TAILOR';

  @IsNotEmpty()
  @IsString()
  // @IsPhoneNumber()
  phoneNumber: '0361234567';

  @IsNotEmpty()
  @IsString()
  national: CountryCode;

  @IsNotEmpty()
  @IsString()
  password: 'TailorBros';

  @IsNotEmpty()
  role: RoleUser.TAILOR;
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  // @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  national: CountryCode;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsOptional()
  role: Role[];
}

export class LogInDTO {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}

export class OTPVerifyDTO {}

export class OTPSendDTO {}

export class UpdateProfileDTO {}

export class ResetPasswordDTO {}

export class ChangePasswordDTO {}

export class ForgotPasswordDTO {}
