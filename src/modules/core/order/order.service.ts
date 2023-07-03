import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
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
          include: { user: true },
        });
      } else {
        return 'Can not found user';
      }
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

  async getDetailOrder(phoneNumber) {
    try {
      const foundOrder = await this.prismaService.order.findMany({
        where: {
          // Number(userId)
          phoneNumber: phoneNumber,
        },
        orderBy: { deadline: 'desc' },
        include: { items: true },
      });
      // console.log(foundOrder);
      return foundOrder;
      // if (!foundOrder) {
      //   throw new NotFoundException();
      // }
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, updateOrderDTO: UpdateOrderDTO) {
    try {
      // const user = await this.prismaService.order.findUnique({
      //   where: { id: Number(id) },
      // });
      return await this.prismaService.order.update({
        where: { id: Number(id) },
        data: {
          // items: updateOrderDTO.items,
          deadline: updateOrderDTO.deadline,
          note: updateOrderDTO.note,
          // items: updateOrderDTO.items
        },
      });
    } catch (error) {}
  }

  async updateOrderStatus() {
    try {
    } catch (error) {}
  }

  async updatePaymentStatus() {
    try {
    } catch (error) {}
  }
}
