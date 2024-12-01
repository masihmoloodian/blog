import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { User } from 'src/auth/decorator/user.decorator';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ResponseDto } from 'src/shared/response.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/shared/pagination.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ summary: 'Create new blog' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async create(@User() user: UserEntity, @Body() dto: CreateBlogDto) {
    const result = await this.blogService.create(user.id, dto);
    return new ResponseDto(result);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs with pagination' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async findAll(@User() user: UserEntity, @Query() pagination: PaginationDto) {
    const result = await this.blogService.getAll(user.id, pagination);
    return new ResponseDto(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog by ID' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async findById(
    @User() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.blogService.getById(user.id, id);
    return new ResponseDto(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update blog' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async update(
    @User() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogDto,
  ) {
    const result = await this.blogService.update(user.id, id, dto);
    return new ResponseDto(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete blog' })
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  async delete(
    @User() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.blogService.delete(user.id, id);
    return new ResponseDto(result);
  }
}
