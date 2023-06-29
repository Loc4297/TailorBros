import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthnModule } from './modules/core/auth/auth.module';
import { OrderModule } from './modules/core/order/order.module';

@Module({
  imports: [PrismaModule, AuthnModule, OrderModule],
})
export class AppModule {}
