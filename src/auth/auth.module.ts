import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserModule } from 'src/user/user.module';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';

@Module({
  imports: [FirebaseModule, UserModule],
  providers: [AuthService, FirebaseAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
