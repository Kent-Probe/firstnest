import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/user.shcema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UniqueEmailValidator } from './validations/unique-email.validator';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   controllers: [UsersController, AuthController],
   providers: [UsersService, AuthService, UniqueEmailValidator],
})
export class UsersModule {}
