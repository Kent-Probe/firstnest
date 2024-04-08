import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>,
   ) {}

   async create(createUserDto: CreateUserDto): Promise<any> {
      try {
         const saltOrRounds = 10;
         const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            saltOrRounds,
         );
         const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
         });
         await createdUser.save();
         return {
            status: 'success',
            code: HttpStatus.CREATED,
            message: 'user created successfully',
         };
      } catch (error) {
         throw new HttpException(
            'Error creating user',
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async findAll(): Promise<User[]> {
      const users = await this.userModel.find().select('-password');
      if (!users) {
         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return users;
   }

   async findOne(id: number): Promise<User> {
      const user = await this.userModel.findOne({ id: id }).select('-password');
      if (!user) {
         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
   }

   async update(ide: number, updateUserDto: UpdateUserDto): Promise<any> {
      if (updateUserDto.password) {
         const saltOrRounds = 10;
         const passwordHashed = await bcrypt.hash(
            updateUserDto.password,
            saltOrRounds,
         );
         updateUserDto = {
            ...updateUserDto,
            password: passwordHashed,
         };
      }
      const user = await this.userModel.findOneAndUpdate(
         { id: ide },
         updateUserDto,
         { new: true },
      );
      if (!user) {
         throw new HttpException(
            'User not found',
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
      return {
         status: 'success',
         code: HttpStatus.OK,
         message: 'user updated successfully',
      };
   }

   async remove(id: number): Promise<any> {
      const user = await this.userModel.findOneAndDelete({ id: id });
      if (!user) {
         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
         status: 'success',
         code: 200,
         message: 'user deleted successfully',
      };
   }

   async findByEmail(email: string): Promise<any> {
      const user = await this.userModel.findOne({ email: email });
      return user;
   }

   /* async uploadFile(userId: number, imagePath: string): Promise<any> {
      let updateUserDto: UpdateUserDto = new UpdateUserDto()
      updateUserDto = {
         ...updateUserDto,
          avatar: imagePath
      }
      console.log(imagePath)
      console.log(updateUserDto)
      const user = await this.userModel.findOneAndUpdate({id: userId}, updateUserDto, {new: true})
      console.log(user)
      if(!user){
         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
         status: 'success',
         code: HttpStatus.OK,
         message: 'user updated file successfully',
      };

   } */
}
