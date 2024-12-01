import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/response.dto';
import { FirebaseUser, User } from 'src/auth/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async getProfile(@User() firebaseUser: FirebaseUser) {
    const user = await this.userService.getByFirebaseUid(firebaseUser.uid);
    return new ResponseDto(user);
  }
}
