import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PhoneNumberValidate } from './validate/phoneNumber.validate';

@Module({
  imports: [PassportModule, ConfigModule, JwtModule.register({})],
  providers: [AuthService, JwtStrategy, PhoneNumberValidate],
  controllers: [AuthController],
})
export class AuthModule {}
