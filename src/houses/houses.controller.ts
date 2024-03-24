import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   HttpStatus,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HousesController {
   constructor(private readonly housesService: HousesService) {}

   @Post()
   @HttpCode(HttpStatus.CREATED)
   create(@Body() createHouseDto: CreateHouseDto): Promise<any> {
      return this.housesService.create(createHouseDto);
   }

   @Get()
   findAll(): Promise<any> {
      return this.housesService.findAll();
   }

   @Get(':code')
   findOne(@Param('code') code: string): Promise<any> {
      return this.housesService.findOne(code);
   }

   @Patch(':code')
   update(
      @Param('code') code: string,
      @Body() updateHouseDto: UpdateHouseDto,
   ): Promise<any> {
      return this.housesService.update(code, updateHouseDto);
   }

   @Delete(':code')
   remove(@Param('code') code: string): Promise<any> {
      return this.housesService.remove(code);
   }
}
