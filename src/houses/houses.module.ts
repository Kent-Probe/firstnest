import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { House, HouseSchema } from './schema/house.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
   ],
   controllers: [HousesController],
   providers: [HousesService],
})
export class HousesModule {}
