import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { INTERNAL_SERVER_ERROR } from 'src/modules/shared/constants/error';
@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(createOrder: CreateOrderDTO) {
    const { deadline, items, note, phoneNumber } = createOrder;
    try {
      const user = await this.prismaService.user.findUnique({
        where: { phoneNumber: phoneNumber },
      });
      if (user) {
        return await this.prismaService.order.create({
          data: {
            note,
            deadline: new Date(deadline),
            user: { connect: { phoneNumber } },
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
          include: { items: true },
        });
      } else {
        return 'Can not found user';
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: order.service.ts:40 ~ OrderService ~ createOrder ~ error:',
        error,
      );
      throw INTERNAL_SERVER_ERROR;
    }
  }

  async getAllOrders(phoneNumber: string, page: number, limit: number) {
    const allOrders = await this.prismaService.order.findMany({
      where: { user: { phoneNumber: phoneNumber } },
    });
    const paginateOrder = [];
    if (!limit) {
      limit = 15;
    }
    let i = 0;
    for (i; i < allOrders.length; i += Number(limit)) {
      const paginate = await this.prismaService.order.findMany({
        skip: Number(i),
        take: Number(limit),
        where: {
          user: {
            phoneNumber: phoneNumber,
          },
        },
        orderBy: {
          id: 'asc',
        },
        include: { items: true },
      });
      paginateOrder.push(paginate);
    }
    if (!page) {
      return paginateOrder[0];
    } else {
      return paginateOrder[page];
    }
  }

  async getDetailOrder(phoneNumber: string) {
    try {
      const foundOrder = await this.prismaService.order.findMany({
        where: {
          phoneNumber: phoneNumber,
        },
        orderBy: { createdAt: 'asc' },
        include: { items: true },
      });
      return foundOrder;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, updateOrderDTO: UpdateOrderDTO) {
    try {
      const updatedOrder = await this.prismaService.order.update({
        where: { id: Number(id) },
        data: {
          note: updateOrderDTO.note,
          deadline: new Date(updateOrderDTO.deadline),
        },
      });
      return updatedOrder;
    } catch (error) {
      return error;
    }
  }

  async updateOrderStatus() {
    try {
    } catch (error) {}
  }

  async updatePaymentStatus() {
    try {
    } catch (error) {}
  }

  async importOrder(path: string) {}
}
