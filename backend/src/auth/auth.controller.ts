import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from '../config/environment';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
  ) {}
  @HttpCode(200) @Post('login') async login(
    @Body() input: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.auth.login(input.email, input.password);
    response.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.cookieSecure,
      maxAge: 2 * 60 * 60 * 1000,
      path: '/',
    });
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      email: user.email,
      role: user.role,
    };
  }
  @HttpCode(204) @Post('logout') logout(
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('access_token', { path: '/' });
  }
  @Get('session') session(@Req() request: Request) {
    return this.auth.session(request.cookies?.access_token);
  }
  @UseGuards(AuthenticatedGuard) @Get('me') me(
    @Req() request: Request & { user: any },
  ) {
    return this.users.findById(request.user.id);
  }
}
