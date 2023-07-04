import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUsers(page: number, limit: number) {
    const allUsers = await this.prismaService.user.findMany();
    const paginateUser = [];
    if (!limit) {
      limit = 15;
    }
    let i = 0;
    for (i; i < allUsers.length; i += Number(limit)) {
      const paginate = this.prismaService.user.findMany({
        skip: Number(i),
        take: Number(limit),
        where: {
          role: 'CLIENT',
        },
        select: { id: true, name: true, phoneNumber: true },
        orderBy: {
          id: 'asc',
        },
      });
      paginateUser.push(paginate);
    }
    if (!page) {
      return paginateUser[0];
    } else {
      return paginateUser[page];
    }
  }

  public async getDetailUser(phoneNumber: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { phoneNumber },
        select: { name: true, phoneNumber: true },
      });

      const orderUser = await this.prismaService.order.findFirst({
        where: { phoneNumber: phoneNumber },
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      });
      console.log(
        '🚀 ~ file: user.service.ts:48 ~ UserService ~ getDetailUser ~ orderUser:',
        orderUser,
      );
      if (!orderUser) return user;
      const userInformation = orderUser.items;
      return Object.assign(user, userInformation);
    } catch (error) {
      throw error;
    }
  }
}
