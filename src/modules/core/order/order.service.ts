import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDTO, ItemDTO, UpdateOrderDTO } from './dto/order.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { INTERNAL_SERVER_ERROR } from 'src/modules/shared/constants/error';
import readXlsxFile from 'read-excel-file/node';
import { ItemType } from '@prisma/client';
import { OrderValidate } from './validate/order.validate';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderValidate: OrderValidate,
  ) {}

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

  async importOrder(file: Buffer) {
    try {
      await readXlsxFile(Buffer.from(file)).then((rows) => {
        try {
          rows.forEach(async (value: any[], index) => {
            if (index < 1) return 'Please fill your data';
            const items: ItemDTO[] = [];

            if (value[2])
              items.push({
                quantity: value[2],
                type: ItemType.SUIT,
                itemInformation: {
                  butt: value[3],
                  calfArm: value[4],
                  chest: value[5],
                  downShoulder: value[6],
                  gile: value[7],
                  handDoor: value[8],
                  longArm: value[9],
                  longShirt: value[10],
                  lowerWaist: value[11],
                  neck: value[12],
                  shoulder: value[13],
                  withinArmpit: value[14],
                  chestType: value[15],
                },
              });
            if (value[17])
              items.push({
                quantity: value[17],
                type: ItemType.SHIRT,
                itemInformation: {
                  butt: value[18],
                  calfArm: value[19],
                  chest: value[20],
                  downShoulder: value[21],
                  gile: value[22],
                  handDoor: value[23],
                  longArm: value[24],
                  longShirt: value[25],
                  lowerWaist: value[26],
                  neck: value[27],
                  shoulder: value[28],
                  withinArmpit: value[29],
                  chestType: value[30],
                },
              });
            if (value[32])
              items.push({
                quantity: value[32],
                type: ItemType.TROUSER,
                itemInformation: {
                  butt: value[33],
                  belly: value[34],
                  bottom: value[35],
                  calfLeg: value[36],
                  femoral: value[37],
                  knee: value[38],
                  longTrouser: value[39],
                  pipe: value[40],
                },
              });

            const data: CreateOrderDTO = {
              phoneNumber: value[0],
              note: value[41],
              items,
              deadline: new Date(value[42]),
            };
            try {
              const check = await this.orderValidate.validateBeforeOrder(data);
              if (!check.status) {
                return { ...check, statusCode: HttpStatus.BAD_REQUEST };
              }
              const user = await this.prismaService.user.findUnique({
                where: { phoneNumber: data.phoneNumber },
              });
              if (user) {
                const createOrderByExcel =
                  await this.prismaService.order.create({
                    data: {
                      note: data.note,
                      deadline: new Date(data.deadline),
                      user: {
                        connect: { phoneNumber: data.phoneNumber },
                      },
                      items: {
                        createMany: {
                          data: data.items.map((value) => {
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
                return createOrderByExcel;
              } else {
                return 'Can not found user';
              }
            } catch (error) {
              return error;
            }
          });
        } catch (error) {
          return error;
        }
      });
      return;
    } catch (error) {
      return error;
    }
  }
}
