import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccessTokenStategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}