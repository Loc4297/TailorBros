import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/modules/shared/decorators/role.decorator';
import { RoleUser } from '../auth/dto/auth.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.TAILOR)
  @ApiQuery({
    required: false,
    name: 'page',
    explode: true,
    example: null,
  })
  @ApiQuery({
    required: false,
    name: 'limit',
    explode: true,
    example: null,
  })
  @Get()
  async getAllUsers(@Query() query) {
    const data_1 = await JSON.stringify(query);
    const data_2 = await JSON.parse(data_1);
    return this.userService.getAllUsers(data_2.page, data_2.limit);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(RoleUser.CLIENT)
  @Get('me')
  getDetailUser(@Req() request) {
    // return request.user;
    return this.userService.getDetailUser(request.user.phoneNumber);
  }
}
