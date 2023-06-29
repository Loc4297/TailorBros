import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { OrderModule } from './modules/core/order/order.module';
import { UserModule } from './modules/core/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, OrderModule, UserModule],
})
export class AppModule {}
