import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   UseInterceptors,
   UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

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

   @HttpCode(200)
   @Post('uploads/:id')
   @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
         destination: 'uploads/user',
         filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname); 
         },
      }),
      fileFilter: (req, file, cb) => {
         if(file.mimetype.startsWith('image/')){
             cb(null, true);
         }else{
             cb(new Error('File not is image'), false);
         }
     }
   }))
   async uploadUserAvatar(@Param('id') userId: string, @UploadedFile() file: MulterField): Promise<any>{ 
      return await this.usersService.uploadFile(+userId, (file as any).path);
   }
}
