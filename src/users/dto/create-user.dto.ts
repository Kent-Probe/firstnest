import {
   IsEmail,
   IsNotEmpty,
   IsNumber,
   IsString,
   Matches,
   Validate,
} from 'class-validator';
import { UniqueEmailValidator } from '../validations/unique-email.validator';

export class CreateUserDto {
   @IsNotEmpty()
   @IsNumber()
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
