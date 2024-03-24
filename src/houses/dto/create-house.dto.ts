import {
   IsBoolean,
   IsNotEmpty,
   IsNumber,
   IsString,
   Matches,
} from 'class-validator';

export class CreateHouseDto {
   @IsString()
   @IsNotEmpty()
   readonly address: string;

   @IsNotEmpty()
   @IsString()
   readonly city: string;

   @IsString()
   readonly state: string;

   @IsNotEmpty()
   readonly size: number;

   @IsString()
   @IsNotEmpty()
   readonly type: string;
   readonly zipcode: string;

   @IsNotEmpty()
   @IsNumber()
   readonly rooms: number;

   @IsNotEmpty()
   @IsNumber()
   readonly bathrooms: number;

   @IsNotEmpty()
   @IsBoolean()
   readonly parking: boolean;

   @IsNotEmpty()
   @IsNumber()
   readonly price: number;

   @IsString()
   @IsNotEmpty()
   @Matches(/^[A-Za-z]{4}\d{4}$/, {
      message: 'Invalid code, please enter four letters and four numbers',
   })
   readonly code: string;
   readonly image: string;
}
