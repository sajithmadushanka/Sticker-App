import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTokenStategy, LocalStrategy, RefreshTokenStategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './services/tokens.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, 
    TokenService,AccessTokenStategy, RefreshTokenStategy
   ],
})
export class AuthModule {}
