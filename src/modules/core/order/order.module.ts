import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
