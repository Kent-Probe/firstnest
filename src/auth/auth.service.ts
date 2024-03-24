import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
   constructor(private readonly userService: UsersService) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findByEmail(email);
      if (user && bcrypt.compareSync(password, user.password)) {
         return {
            status: 'success',
            code: 200,
            message: 'login successful',
         };
      }
      throw new HttpException(
         {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Invalid credentials',
         },
         HttpStatus.UNAUTHORIZED,
      );
   }
}
