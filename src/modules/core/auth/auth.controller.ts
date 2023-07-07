import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LogInDTO, RegisterDTO, RoleUser, TailorDTO } from './dto/auth.dto';
import JwtAuthGuard from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from 'src/modules/shared/decorators/role.decorator';
import { PhoneNumberValidate } from './validate/phoneNumber.validate';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly phoneValidate: PhoneNumberValidate,
  ) {}

  // @Post('tailor')
  // @ApiBody({
  //   type: TailorDTO,
  //   examples: {
  //     tailor: {
  //       value: {
  //         name: 'TAILOR',
  //         phoneNumber: '0361234567',
  //         password: 'TailorBros',
  //         national: 'VN',
  //         role: RoleUser.TAILOR,
  //       } as TailorDTO,
  //     },
  //   },
  // })
  // async createTailor(@Body() data: TailorDTO) {
  //   try {
  //     const check = await this.phoneValidate.validateUserDTO(data);
  //     if (!check) {
  //       return { statusCode: HttpStatus.BAD_REQUEST };
  //     }
  //     return this.authService.createTailor(data);
  //   } catch (error) {
  //     console.log(
  //       '🚀 ~ file: auth.controller.ts:33 ~ AuthController ~ createTailor ~ error:',
  //       error,
  //     );
  //     throw error;
  //   }
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleUser.TAILOR)
  @Post('register')
  @ApiBody({
    type: RegisterDTO,
    examples: {
      user_RU: {
        value: {
          name: 'JohnRU',
          phoneNumber: '8 (800) 555-35-35',
          national: 'RU',
          password: '1232@asdS',
        } as RegisterDTO,
      },
      user_US: {
        value: {
          name: 'JohnUS',
          phoneNumber: '(213) 373-42-53',
          national: 'US',
          password: '1232@asdS',
        } as RegisterDTO,
      },
      user_VN: {
        value: {
          name: 'JohnVN',
          phoneNumber: '0365970516',
          national: 'VN',
          password: '1232@asdS',
        } as RegisterDTO,
      },
    },
  })
  async register(@Body() registrationData: RegisterDTO) {
    try {
      const check = await this.phoneValidate.validateUserDTO(registrationData);
      if (!check) {
        return { statusCode: HttpStatus.BAD_REQUEST };
      }
      return this.authService.register(registrationData);
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.controller.ts:67 ~ AuthController ~ register ~ error:',
        error,
      );
      throw error;
    }
  }

  @Post('log-in')
  @ApiBody({
    type: LogInDTO,
    examples: {
      tailor: {
        value: {
          phoneNumber: '0361234567',
          password: 'TailorBros',
        } as LogInDTO,
      },
      user: {
        value: {
          phoneNumber: '0365920514',
          password: '1232@asdS',
        } as LogInDTO,
      },
    },
  })
  async logIn(@Body() logInData: LogInDTO) {
    return this.authService.login(logInData);
  }
}
