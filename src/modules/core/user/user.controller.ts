import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/modules/shared/decorators/role.decorator';
import { RoleUser } from '../auth/dto/auth.dto';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(RoleUser.TAILOR)
  //   @Get()
  //   getAllUsers() {
  //     return this.userService.getAllUsers();
  //   }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(RoleUser.CLIENT)
  @Get('me')
  getDetailUser(@Req() request) {
    return request.user;
  }
}
