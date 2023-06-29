import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
//This service is used to connect DB
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          //we need to secure this !
          url: configService.get('DATABASE_URL'),
        },
      },
    });
    console.log('db url :' + configService.get('DATABASE_URL'));
  }
  cleanDatabase() {
    //In a 1 - N relation, delete N firstly, then delete a"1"
    console.log('cleanDatabase');
    return this.$transaction([this.user.deleteMany()]);
  }
}
