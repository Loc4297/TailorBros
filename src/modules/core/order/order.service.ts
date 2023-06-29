import { Injectable } from '@nestjs/common';
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
      });
    } catch (error) {
      console.log('🚀 ~ file: order.service.ts:9 ~ :', error);
    }
  }
}
