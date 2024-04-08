import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { HousesModule } from './houses/houses.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
dotenv.config();

@Module({
   imports: [
      UsersModule,
      HousesModule,
      MongooseModule.forRoot(process.env.DB_URL),
      /* ServeStaticModule.forRoot({
         rootPath: join(__dirname, '..'),
         serveRoot: '/'
      }) */
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
