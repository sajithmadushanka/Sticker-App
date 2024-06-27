import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class RefreshTokenStategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly authService:AuthService,
    private readonly configSErvice:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSErvice.get<string>('JWT_REFRESH_TOKEN_SECRET')
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.id, payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}