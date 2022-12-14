import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/user/user-service.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/entity/User';
import { JwtService } from '@nestjs/jwt';


export interface UserPayload {
  sub: string;
  email: string;
  firstName: string;
  iat?: number;
  exp?: number
}

interface UserToken {
  access_token: string;
}

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string) {

    const user = await this.userService.findbyEmail(email)

    if (user) {

      const isValid = await bcrypt.compare(password, user.password)
      this.logger.debug(`AuthService:  ${JSON.stringify(user)}`)

      if (isValid) {
        return {
          ...user,
          password: undefined
        };
      }
    }
    throw new Error('Email address or password provided is incorrect.')
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName
    }
    const jwtToken = this.jwtService.sign(payload)
    return {
      access_token: jwtToken
    }

  }
}