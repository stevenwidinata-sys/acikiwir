import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(body: AuthDTO) {
    const email = body.email;
    const password = body.password;
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email is already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      message: 'Registration profile created securely!',
      user: { id: user.id, email: user.email },
    };
  }

  async login(body: AuthDTO) {
    const email = body.email;
    const password = body.password;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(
        'Authentication failed. Invalid email or password.',
      );
    }

    const payload = { sub: user.id, email: user.email };

    return {
      message: 'Authentication identity verified successfully!',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
