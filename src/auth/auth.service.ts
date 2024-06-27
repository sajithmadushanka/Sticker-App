
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { HashData } from 'src/common/utils';
import { TokenService } from './services/tokens.service';
import { AuthResponse, ErrorResponse } from './types';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService
        , private readonly tokenService:TokenService
    ) {}

    async validateUser(email:string, password:string): Promise<any> {
        console.log('===================================')
        const user = await this.prisma.auth.findUnique({
            where: {
                email
            }
        });
        if(user && await HashData.comparePassword(password, user.password)){
            const {password, ...result} = user
            return result;
        }
        return null;
    }
    async updateRefreshToken(id:string, refreshToken:string):Promise<boolean>{
        const hashedRefreshToken = await HashData.hasPassword(refreshToken);
        try{
            await this.prisma.auth.update({
                where:{id},
                data:{
                    refreshToken:hashedRefreshToken
                }
            });
            return true;
        }catch(e){
            throw new Error('Refresh token update failed');
        }
    }

    async signup(user:AuthDto):Promise<AuthResponse | ErrorResponse> {
        try {
            const isUserExists = await this.prisma.auth.findUnique({
                where: {
                    email: user.email
                }
            });
            if(isUserExists){
                return { error: 'User already exists' };
            }

            const hashedPassword = await HashData.hasPassword(user.password);
           
            const newUser = await this.prisma.auth.create({
                data: {
                    ...user,
                    password: hashedPassword,
                },
            });
        
            const tokens = await this.tokenService.generateToken(newUser.id, newUser.email);

            
            if(this.updateRefreshToken(newUser.id, tokens.refreshToken)){
                console.log('Refresh token updated');
            }else console.log('Refresh token not updated')
            
           
            const {password,refreshToken,  ...user_} = newUser;
            return{
                user: user_,
                tokens
            }

        } catch (error) {
            console.log(error)
            throw new Error('Signup failed');
        }
    }

    async signin(authDto:AuthDto):Promise<AuthResponse | ErrorResponse>{
        try{
            const user = await this.prisma.auth.findUnique({
                where:{email:authDto.email}
            });

            if(!user) return {error : "User not found"}

            const tokens = await this.tokenService.generateToken(user.id, user.email);
            const {password,refreshToken, ...userWithoutPassword} = user;
            return{
                user:userWithoutPassword,
                tokens
            }
            }catch(e){
            throw new Error('SignIn failed');
        }
    }

    async logout(authId:string):Promise<string>{
       const result = await this.prisma.auth.updateMany({
            where:{
                id:authId,
                refreshToken:{not:null}
            },
            data:{
                refreshToken:null
            
            }
        });
        if(result) return 'User logged out';
        return 'User not logged out';
    }
        
}
    
    
//     async signin(authDto:AuthDto) {
//       try {
//         const isAuthExists = await this.prisma.auth.findUnique({
//             where: {
//                 email: authDto.email
//             }
//         });
//         if(!isAuthExists){
//             return 'User does not exists';
//         }
//         const isPasswordMatch = await HashData.comparePassword(authDto.password, isAuthExists.password);
//         if(!isPasswordMatch){
//             return 'Password does not match';
//         }
//         return 'User logged in';


//       } catch (error) {
//         return error;
//       }
//     }

// // }
