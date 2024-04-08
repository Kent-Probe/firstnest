import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
   constructor(private readonly userService: UsersService) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findByEmail(email);
      if (user && bcrypt.compareSync(password, user.password)) {
         const token = jwt.sign(
            {
               id: user.id,
               email: user.email,
               rol: user.rol,
               avatar: user.avatar,
               name: user.name,
               lastname: user.lastname,
            },
            process.env.JWT_SECRET,
            {
               expiresIn: 3600,
            },
         );
         return {
            status: 'success',
            code: 200,
            message: 'login successful',
            token: token,
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
