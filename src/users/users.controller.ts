import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Get()
   async findAll(): Promise<User[]> {
      const users = await this.usersService.findAll();
      return users;
   }
   @Get(':id')
   async findOne(@Param('id') id: string): Promise<User> {
      const user = await this.usersService.findOne(+id);
      return user;
   }
   @Post()
   @HttpCode(201)
   async create(@Body() createUserDto: CreateUserDto): Promise<any> {
      return this.usersService.create(createUserDto);
   }
   @Patch(':id')
   update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
   ): Promise<any> {
      return this.usersService.update(+id, updateUserDto);
   }
   @Delete(':id')
   remove(@Param('id') id: string): Promise<any> {
      return this.usersService.remove(+id);
   }
}
