import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/guards';


@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal:true}),
    TaskModule, UserModule, PrismaModule],
    providers: [
      {
        provide: 'APP_GUARD',
        useClass:AtGuard
      }
    ],
})
export class AppModule {}
