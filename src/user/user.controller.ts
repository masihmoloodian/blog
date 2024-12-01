import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/response.dto';
import { FirebaseUser, User } from 'src/auth/decorator/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async getProfile(@User() user: UserEntity) {
    const _user = await this.userService.getById(user.id);
    return new ResponseDto(_user);
  }
}
