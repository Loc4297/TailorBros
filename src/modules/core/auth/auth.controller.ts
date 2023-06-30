import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LogInDTO, RegisterDTO, RoleUser, TailorDTO } from './dto/auth.dto';
import JwtAuthGuard from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from 'src/modules/shared/decorators/role.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('tailor')
  // @ApiBody({
  //   type: TailorDTO,
  //   examples: {
  //     tailor: {
  //       value: {
  //         name: 'TAILOR',
  //         phoneNumber: '0361234567',
  //         password: 'TailorBros',
  //         role: RoleUser.TAILOR,
  //       } as TailorDTO,
  //     },
  //   },
  // })
  // async createTailor(@Body() data: TailorDTO) {
  //   return this.authService.createTailor(data);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleUser.TAILOR)
  @Post('register')
  @ApiBody({
    type: RegisterDTO,
    examples: {
      user_1: {
        value: {
          name: 'John',
          phoneNumber: '0365920514',
          password: '1232@asdS',
        } as RegisterDTO,
      },
    },
  })
  async register(@Body() registrationData: RegisterDTO) {
    return this.authService.register(registrationData);
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
