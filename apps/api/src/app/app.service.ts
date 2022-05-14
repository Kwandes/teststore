import { IMessage } from '@interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): IMessage {
    return { message: 'Welcome to api!' };
  }
}
