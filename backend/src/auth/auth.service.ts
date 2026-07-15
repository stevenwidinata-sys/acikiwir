import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new BadRequestException('Email is already registered!');
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return {
      message: 'Registration profile created successfully!',
      user,
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      throw new BadRequestException(
        'Authentication failed. Invalid email or password.',
      );
    }

    return {
      message: 'Authentication identity verified successfully!',
    };
  }
}