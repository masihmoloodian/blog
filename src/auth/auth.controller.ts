import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return new ResponseDto('User registration successful');
  }

  @Post('login')
  @ApiOperation({ summary: 'Get token' })
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return new ResponseDto(result);
  }
}
