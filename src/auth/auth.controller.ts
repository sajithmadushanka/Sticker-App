import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse, ErrorResponse, Tokens } from './types';
import { AtGuard } from './guards/AtGaurd';
import { GetCurrentUserId, Public } from 'src/common/decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  async signup(@Body() authDto:AuthDto):Promise<AuthResponse | ErrorResponse> {
    return this.authService.signup(authDto);
  }

  @Public()
  @Post('local/signin')
  async signin(@Body() authDto:AuthDto) :Promise<AuthResponse | ErrorResponse>{
    return this.authService.signin(authDto)
  }

  /// protected routes----------------
  @Get()
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@GetCurrentUserId() id):Promise<string>{
    return this.authService.logout(id);
  }
}

