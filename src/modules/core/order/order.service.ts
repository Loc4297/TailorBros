import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(createOrder: CreateOrderDTO, userId: string) {
    const { deadline, items, note } = createOrder;
    try {
      const { id } = await this.prismaService.user.findUnique({
        where: { id: Number(userId) },
      });

      return await this.prismaService.order.create({
        data: {
          note,
          deadline: new Date(deadline),
          user: { connect: { id } },
          items: {
            createMany: {
              data: items.map((value) => {
                const { itemInformation, quantity, type } = value;
                const information: any = itemInformation;
                return {
                  itemInformation: information,
                  quantity,
                  type,
                };
              }),
            },
          },
        },
        include: { user: true },
      });
    } catch (error) {
      console.log('🚀 ~ file: order.service.ts:9 ~ :', error);
    }
  }

  async getAllOrders(data) {
    const allOrders = await this.prismaService.order.findMany({
      where: { user: { phoneNumber: data } },
    });
    // console.log(allUsers.length);
    const paginateOrder = [];
    for (let i = 0; i < allOrders.length; i += 5) {
      const a = i;
      const b = 5;
      const paginate = await this.prismaService.order.findMany({
        skip: a,
        take: b,
        where: {
          user: {
            phoneNumber: data,
          },
        },
        include: { user: true, items: true },
      });
      // console.log(paginate);
      paginateOrder.push(paginate);
      // return paginateUser;
    }
    return paginateOrder;
  }

  async getDetailOrder(userId: string) {
    try {
      const foundOrder = await this.prismaService.order.findMany({
        where: {
          // Number(userId)
          userId: Number(userId),
        },
        orderBy: { deadline: 'desc' },
        include: { items: true },
      });
      // console.log(foundOrder);
      return foundOrder;
      if (!foundOrder) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    }
  }
}
