import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RegisterDTO, TailorDTO } from '../dto/auth.dto';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { INTERNAL_SERVER_ERROR } from 'src/modules/shared/constants/error';

@Injectable()
export class PhoneNumberValidate {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUserDTO(registerDTO: RegisterDTO | TailorDTO) {
    try {
      const { phoneNumber, national } = registerDTO;
      const phoneStatus = isValidPhoneNumber(phoneNumber, national);
      console.log(
        '🚀 ~ file: phoneNumber.validate.ts:15 ~ PhoneNumberValidate ~ validateUserDTO ~ phoneStatus:',
        phoneStatus,
      );
      return phoneStatus;
    } catch (error) {
      console.log(
        '🚀 ~ file: phoneNumber.validate.ts:17 ~ PhoneNumberValidate ~ validateUserDTO ~ error:',
        error,
      );
      throw INTERNAL_SERVER_ERROR;
    }
  }
}
