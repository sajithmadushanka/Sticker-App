import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse, ErrorResponse, Tokens } from './types';
import { AtGuard } from './guards/AtGaurd';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  async signup(@Body() authDto:AuthDto):Promise<AuthResponse | ErrorResponse> {
    return this.authService.signup(authDto);
  }

  @Post('local/signin')
  async signin(@Body() authDto:AuthDto) :Promise<AuthResponse | ErrorResponse>{
    return this.authService.signin(authDto)
  }

  /// protected routes----------------
  @Get()
  @UseGuards(AtGuard)
  async getProfile(@Request() req) {
    return req.user;
  }
}
