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
    examples: {},
  })
  async createOrder(
    @Body() createOrder: CreateOrderDTO,
    @Param('userId') userId: string,
  ) {
    return await this.orderService.createOrder(createOrder, userId);
  }
}
