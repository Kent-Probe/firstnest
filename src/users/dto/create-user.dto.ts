import {
   IsEmail,
   IsNotEmpty,
   IsString,
   Matches,
   Validate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UniqueEmailValidator } from '../validations/unique-email.validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends PartialType(UpdateUserDto) {
   @IsNotEmpty()
   readonly id: string;
   @IsNotEmpty()
   @IsString()
   readonly name: string;
   @IsNotEmpty()
   @IsString()
   readonly lastname: string;
   @IsNotEmpty()
   @IsEmail()
   @Validate(UniqueEmailValidator)
   readonly email: string;
   @IsNotEmpty()
   @IsString()
   @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
      message:
         'Password must be at least 8 characters and contain only special characters and start with Uppercase',
   })
   readonly password: string;
   readonly rol: string;
}
