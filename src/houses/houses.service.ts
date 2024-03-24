import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { Model } from 'mongoose';
import { House } from './entities/house.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HousesService {
   constructor(
      @InjectModel(House.name) private readonly houseModel: Model<House>,
   ) {}
   async create(createHouseDto: CreateHouseDto): Promise<any> {
      try {
         const createHouse = new this.houseModel({
            ...createHouseDto,
         });
         await createHouse.save();
         return {
            status: 'success',
            code: HttpStatus.CREATED,
            message: 'house created successfully',
         };
      } catch (error) {
         throw new HttpException(
            'Error creating house',
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
   async findAll(): Promise<House[]> {
      const houses = await this.houseModel.find().select('-_id');
      if (houses) {
         return houses;
      }
      throw new HttpException('Houses not found', HttpStatus.NOT_FOUND);
   }

   async findOne(code: string): Promise<any> {
      const house = await this.houseModel.find({ code: code }).select('-_id');
      if (house) {
         return house;
      }
      throw new HttpException('House not found', HttpStatus.NOT_FOUND);
   }

   async update(code: string, updateHouseDto: UpdateHouseDto) {
      const house = await this.houseModel.findOneAndUpdate(
         { code },
         updateHouseDto,
         { new: true },
      );
      if (house) {
         return {
            status: 'success',
            code: HttpStatus.OK,
            message: 'house updated successfully',
         };
      }
      throw new HttpException(
         'Error updating',
         HttpStatus.INTERNAL_SERVER_ERROR,
      );
   }

   async remove(code: string) {
      const house = await this.houseModel.findOneAndDelete({ code: code });
      if (house) {
         return {
            status: 'success',
            code: HttpStatus.OK,
            message: 'house deleted successfully',
         };
      }
      throw new HttpException('Error deleting', HttpStatus.NOT_FOUND);
   }
}
