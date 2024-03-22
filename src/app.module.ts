import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesController } from './houses/houses.controller';
import { HousesService } from './houses/houses.service';
import { UsersModule } from './users/users.module';
import { HousesModule } from './houses/houses.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
   imports: [
      UsersModule,
      HousesModule,
      MongooseModule.forRoot(process.env.DB_URL),
   ],
   controllers: [AppController, HousesController],
   providers: [AppService, HousesService],
})
export class AppModule {}
