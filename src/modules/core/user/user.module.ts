import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [PassportModule, ConfigModule, JwtModule.register({})],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
