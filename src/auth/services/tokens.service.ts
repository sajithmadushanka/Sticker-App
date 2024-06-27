import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService:JwtService,
        private readonly configService:ConfigService
    ) {}
    async generateToken(id:string, email:string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({id, email},
                {
                    secret:this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: 60 * 15 // 15 min
                }
            ),
            this.jwtService.signAsync({id, email}, 
                {
                    secret:this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: '7d'
                }
              )
        ]);
        console.log(this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'));
        return {accessToken, refreshToken};
    }
}