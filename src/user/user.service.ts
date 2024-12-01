import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<UserEntity>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getByFirebaseUid(firebaseUid: string) {
    return this.userRepository.findOne({ where: { firebaseUid } });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
