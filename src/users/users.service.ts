import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
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

  // Update a user
  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save({ ...updateUserDto, id } as User);
  }

  // Remove a user
  remove(id: number): Promise<void> {
    return this.usersRepository.delete(id).then(() => {});
  }
}
