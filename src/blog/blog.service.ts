import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from './entities/blog.entity';
import { UserService } from 'src/user/user.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private readonly storageService: StorageService,
  ) {}

  async create(userId: string, dto: CreateBlogDto): Promise<BlogEntity> {
    let imageUrl: string;
    if (dto.imageObjectKey) {
      const publicUrl = await this.storageService.generatePublicUrl(
        dto.imageObjectKey,
      );
      imageUrl = publicUrl;
    }
    const blog = this.blogRepository.create({ userId, ...dto, imageUrl });
    return this.blogRepository.save(blog);
  }

  async getAll(userId: string): Promise<BlogEntity[]> {
    return this.blogRepository.find({
      where: { userId },
    });
  }

  async getById(userId: string, id: string): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne({
      where: { id, userId },
    });
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);

    return blog;
  }

  async update(
    userId: string,
    id: string,
    input: UpdateBlogDto,
  ): Promise<BlogEntity> {
    const blog = await this.getById(userId, id);
    Object.assign(blog, input);
    return this.blogRepository.save(blog);
  }

  async delete(userId: string, id: string): Promise<void> {
    const blog = await this.getById(userId, id);
    await this.blogRepository.remove(blog);
  }
}
