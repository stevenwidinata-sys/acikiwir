import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private usersDatabase: any[] = [];

  @Post('register')
  register(@Body() body: any, @Res() res) {
    const { email, password } = body;
    
    const userExists = this.usersDatabase.find(user => user.email === email);
    if (userExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ 
        message: 'Email is already registered!' 
      });
    }

    this.usersDatabase.push({ email, password });
    return res.status(HttpStatus.CREATED).json({ 
      message: 'Registration profile created successfully!' 
    });
  }

  @Post('login')
  login(@Body() body: any, @Res() res) {
    const { email, password } = body;
    
    const user = this.usersDatabase.find(
      u => u.email === email && u.password === password
    );
    
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({ 
        message: 'Authentication failed. Invalid email or password.' 
      });
    }

    return res.status(HttpStatus.OK).json({ 
      message: 'Authentication identity verified successfully!' 
    });
  }
}