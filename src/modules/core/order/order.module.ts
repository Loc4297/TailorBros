import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderValidate } from './validate/order.validate';

@Module({
  imports: [],
  providers: [OrderService, OrderValidate],
  controllers: [OrderController],
})
export class OrderModule {}
