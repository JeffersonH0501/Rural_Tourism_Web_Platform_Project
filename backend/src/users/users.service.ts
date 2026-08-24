import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { RegisterUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  private email(value: string) {
    return value.trim().toLowerCase();
  }
  async register(input: RegisterUserDto) {
    const email = this.email(input.email);
    if (await this.repository.exist({ where: { email } }))
      throw new ConflictException('An account with this email already exists');
    const user = this.repository.create({
      ...input,
      email,
      passwordHash: await bcrypt.hash(input.password, 12),
    });
    delete (user as any).password;
    return this.repository.save(user);
  }
  findAll() {
    return this.repository.find();
  }
  async findById(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  findByEmailWithPassword(email: string) {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: this.email(email) })
      .getOne();
  }
  async update(id: number, input: UpdateUserDto) {
    const user = await this.findById(id);
    Object.assign(user, input);
    return this.repository.save(user);
  }
  async remove(id: number) {
    const user = await this.findById(id);
    await this.repository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
