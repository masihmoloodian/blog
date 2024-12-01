import { Controller, Get, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { ResponseDto } from 'src/shared/response.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/auth/decorator/user.decorator';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('signedUrl')
  @ApiOperation({ summary: 'Generate signed url to perform PUT action' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async generateSignedPutUrl(@User() user: UserEntity) {
    const result = await this.storageService.generateSignedPutUrl(user.id);
    return new ResponseDto(result);
  }
}
