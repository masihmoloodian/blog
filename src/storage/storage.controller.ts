import { Controller, Get, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { ResponseDto } from 'src/shared/response.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('signedUrl')
  @ApiOperation({ summary: 'Generate signed url to perform PUT action' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async generateSignedPutUrl() {
    const result = await this.storageService.generateSignedPutUrl();
    return new ResponseDto(result);
  }
}
