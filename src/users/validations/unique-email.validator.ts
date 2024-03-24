import { Injectable } from '@nestjs/common';
import {
   ValidatorConstraint,
   ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'uniqueEmail', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
   constructor(private readonly userService: UsersService) {}

   async validate(value: any): Promise<boolean> {
      const user = await this.userService.findByEmail(value);
      if (user) {
         return false;
      }
      return true;
   }

   defaultMessage(): string {
      return 'Email already exists';
   }
}
