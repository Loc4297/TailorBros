import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LogInDTO, RegisterDTO, TailorDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async createTailor(data: TailorDTO) {
    const hashedPassword = await argon.hash(data.password);
    try {
      const tailor = await this.prismaService.user.create({
        data: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          password: hashedPassword,
          role: data.role,
        },
        select: {
          id: true,
          name: true,
          phoneNumber: true,
        },
      });
      return tailor;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async register(registrationData: RegisterDTO) {
    const hashedPassword = await argon.hash(registrationData.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: registrationData.name,
          phoneNumber: registrationData.phoneNumber,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          phoneNumber: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async login(logInData: LogInDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        phoneNumber: logInData.phoneNumber,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const passwordMatched = await argon.verify(
      user.password,
      logInData.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    return await this.signJwtToken(user.id, user.phoneNumber);
  }
  // (...)
  async signJwtToken(
    userId: number,
    phoneNumber: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      phoneNumber,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      //   expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
