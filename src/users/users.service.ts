import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: CreateUserDto) {
        const userExists = await this.userRepository.findOne({ where: { email: user.email } });

        if (!userExists)
            return new HttpException('User already exists', HttpStatus.CONFLICT);

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number) {
        const userExists = await this.userRepository.findOne({ where: { id } });

        if (!userExists)
            return new HttpException('User not found', HttpStatus.NOT_FOUND);

        return userExists;
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id });

        if (result.affected === 0)
            return new HttpException('User not found', HttpStatus.NOT_FOUND);

        return result;
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const userExists = await this.userRepository.findOne({ where: { id } });

        if (!userExists)
            return new HttpException('User not found', HttpStatus.NOT_FOUND);

        const updateUser = Object.assign(userExists, user);
        return this.userRepository.update({ id }, updateUser);
    }
}
