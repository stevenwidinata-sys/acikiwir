import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard.';

interface UserPayload {
  id: string;
  email: string;
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req: RequestWithUser) {
    return req.user;
  }
}
