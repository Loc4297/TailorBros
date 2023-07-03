import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  Get,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/modules/shared/decorators/role.decorator';
import { RoleUser } from '../auth/dto/auth.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-orders')
  @ApiBody({
    type: CreateOrderDTO,
    examples: {
      suit_1: {
        value: {
          phoneNumber: '0365920514',
          note: 'As soon as possible',
          deadline: '2023-06-27 09:12:46.255',
          items: [
            {
              quantity: 2,
              type: 'SUIT',
              itemInformation: {
                shoulder: 12,
                longShirt: 1,
                calfArm: 1,
                neck: 2,
                gile: 2,
                chestType: 'T',
                downShoulder: 2,
                longArm: 2,
                withinArmpit: 2,
                chest: 2,
                butt: 2,
                handDoor: 2,
                lowerWaist: 2,
              },
            },
          ],
        },
      },
      shirt_1: {
        value: {
          phoneNumber: '0365920515',
          note: 'As soon as possible',
          deadline: '2023-08-27 09:12:46.255',
          items: [
            {
              quantity: 3,
              type: 'SHIRT',
              itemInformation: {
                shoulder: 12,
                longShirt: 1,
                calfArm: 1,
                neck: 2,
                gile: 2,
                chestType: 'S',
                downShoulder: 2,
                longArm: 2,
                withinArmpit: 2,
                chest: 2,
                butt: 2,
                handDoor: 2,
                lowerWaist: 2,
              },
            },
          ],
        },
      },
      trouser_1: {
        value: {
          phoneNumber: '0365920516',
          note: 'As soon as possible',
          deadline: '2023-09-27 09:12:46.255',
          items: [
            {
              quantity: 4,
              type: 'TROUSER',
              itemInformation: {
                belly: 12,
                femoral: 1,
                pipe: 1,
                bottom: 2,
                butt: 2,
                knee: 2,
                longTrouser: 2,
                calfLeg: 2,
              },
            },
          ],
        },
      },
      trouser_shirt: {
        value: {
          phoneNumber: '0365920517',
          note: 'As soon as possible',
          deadline: '2023-09-27 09:12:46.255',
          items: [
            {
              quantity: 4,
              type: 'TROUSER',
              itemInformation: {
                belly: 12,
                femoral: 1,
                pipe: 1,
                bottom: 2,
                butt: 2,
                knee: 2,
                longTrouser: 2,
                calfLeg: 2,
              },
            },
            {
              quantity: 4,
              type: 'TROUSER',
              itemInformation: {
                belly: 12,
                femoral: 1,
                pipe: 1,
                bottom: 2,
                butt: 2,
                knee: 2,
                longTrouser: 2,
                calfLeg: 2,
              },
            },
          ],
        },
      },
    },
  })
  async createOrder(@Body() createOrder: CreateOrderDTO) {
    return await this.orderService.createOrder(createOrder);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.TAILOR)
  @ApiQuery({
    required: false,
    name: 'phoneNumber',
    explode: true,
    example: null,
  })
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
  async getAllOrders(@Query() query) {
    console.log(query);
    const data_1 = await JSON.stringify(query);
    const data_2 = await JSON.parse(data_1);
    return this.orderService.getAllOrders(
      data_2.phoneNumber,
      data_2.page,
      data_2.limit,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getDetailOrder(@Req() request) {
    // console.log(request.user.id);
    return this.orderService.getDetailOrder(request.user.phoneNumber);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateOrderDTO,
    examples: {
      update_1: {
        value: {
          note: 'Within this week',
          deadline: '2024-09-27 09:12:46.255',
        },
      },
    },
  })
  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDTO: UpdateOrderDTO) {
    // console.log(id);
    // console.log(updateOrderDTO);

    return this.orderService.updateOrder(id, updateOrderDTO);
  }
}
