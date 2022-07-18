import { Injectable } from '@nestjs/common';

/* istanbul ignore file */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Nudgty is in good state';
  }
}
