import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUsers(page) {
    const allUsers = await this.prismaService.user.findMany();
    // console.log(allUsers.length);
    const paginateUser = [];
    for (let i = 0; i < allUsers.length; i += 5) {
      const a = i;
      const b = 5;
      const paginate = await this.prismaService.user.findMany({
        skip: a,
        take: b,
        where: {
          role: 'CLIENT',
        },
      });
      // console.log(paginate);
      paginateUser.push(paginate);
      // return paginateUser;
    }
    console.log(page);
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
