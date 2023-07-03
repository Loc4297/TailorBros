import { Injectable, NotFoundException } from '@nestjs/common';
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

  // public async getDetailUser(id: number) {
  //   try {
  //     const foundUser = await this.prismaService.user.findUnique({
  //       where: { id },
  //     });
  //     if (!foundUser) {
  //       throw new NotFoundException();
  //     }
  //     return foundUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
