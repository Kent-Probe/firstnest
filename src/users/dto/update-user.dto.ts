import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
   readonly id: string;
   @IsOptional()
   @IsString()
   readonly name: string;
   @IsOptional()
   @IsString()
   readonly lastname: string;
   @IsOptional()
   @IsEmail()
   readonly email: string;
   @IsOptional()
   @IsString()
   @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
      message:
         'Password must be at least 8 characters and contain only special characters and start with Uppercase',
   })
   readonly password: string;
   readonly rol: string;
   @IsOptional()
   @IsString()
   readonly avatar: string;
}
