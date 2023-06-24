import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.userService.createUser(newUser);
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.userService.updateUser(id, user);
    }
}