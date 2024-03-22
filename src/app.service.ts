import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   getHello(name: string): string {
      if (name == null) return `Hello World!`;
      return `Hello ${name}`;
   }

   sayGoodbay(): string {
      return 'Bye! bye!';
   }
}
