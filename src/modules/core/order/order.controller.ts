import { Body, Controller, Post, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

@Controller('')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('users/:userId/orders')
  @ApiBody({
    type: CreateOrderDTO,
    examples: {
      suit_1: {
        value: {
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
    },
  })
  async createOrder(
    @Body() createOrder: CreateOrderDTO,
    @Param('userId') userId: string,
  ) {
    return await this.orderService.createOrder(createOrder, userId);
  }
}
