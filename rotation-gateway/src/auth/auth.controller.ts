import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guards';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    console.log(req.user)
    return this.authService.login(req.user)
  }
}