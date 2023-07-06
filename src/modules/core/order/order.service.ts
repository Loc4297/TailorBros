import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, ItemDTO, UpdateOrderDTO } from './dto/order.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { INTERNAL_SERVER_ERROR } from 'src/modules/shared/constants/error';
import readXlsxFile from 'read-excel-file/node';
import * as fs from 'fs';
import { ItemType } from '@prisma/client';

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

  async importOrder(file: Buffer) {
    readXlsxFile(Buffer.from(file)).then((rows) => {
      // console.log(
      //   '🚀 ~ file: order.service.ts:130 ~ OrderService ~ ).then ~ rows:',
      //   rows,
      // );
      const keys = rows[0];
      const arrData = [];
      rows.forEach(async (value: any[], index) => {
        if (index < 1) return;
        const phoneNumber = `0${value[0]}`;
        const user = await this.prismaService.user.findFirst({
          where: { phoneNumber },
        });
        // if (!user) return;
        const items: ItemDTO[] = [];

        if (value[1])
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
        if (value[16])
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
        if (value[31])
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
          deadline: value[42],
        };
        arrData.push(data);
        console.log(
          '🚀 ~ file: order.service.ts:205 ~ OrderService ~ rows.forEach ~ arrData:',
          arrData,
        );

        let i = 0;
        for (i; i < arrData.length; i++) {
          console.log(
            '🚀 ~ file: order.service.ts:208 ~ OrderService ~ readXlsxFile ~ arrData:',
            arrData[i],
          );
          const user = await this.prismaService.user.findUnique({
            where: { phoneNumber: arrData[i].phoneNumber },
          });
          console.log(
            '🚀 ~ file: order.service.ts:219 ~ OrderService ~ rows.forEach ~ user:',
            user,
          );
          if (user) {
            return this.prismaService.order.create({
              data: {
                note: arrData[i].note,
                deadline: new Date(arrData[i].deadline),
                user: {
                  connect: { phoneNumber: arrData[i].phoneNumber },
                },
                items: {
                  createMany: {
                    data: arrData[i].items.map((value) => {
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
        }
      });
    });
  }
}
