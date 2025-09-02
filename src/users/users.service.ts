import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return this.usersRepository.save(user);
  }

  // Get all users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Get a single user by ID
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } }) as Promise<User>;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Update a user
  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save({ ...updateUserDto, id } as User);
  }

  // Remove a user
  remove(id: number): Promise<void> {
    return this.usersRepository.delete(id).then(() => {});
  }
}
