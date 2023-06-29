import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUsers() {
    const allUsers = await this.prismaService.user.findMany();
    return allUsers;
  }

  public async getDetailUser(id: number) {
    try {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!foundUser) {
        throw new NotFoundException();
      }
      return foundUser;
    } catch (error) {
      throw error;
    }
  }
}
