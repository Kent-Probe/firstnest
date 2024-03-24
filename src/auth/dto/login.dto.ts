import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
   @IsEmail()
   @IsNotEmpty({ message: 'Please enter a valid email' })
   readonly email: string;
   @IsString()
   @IsNotEmpty()
   readonly password: string;
}
