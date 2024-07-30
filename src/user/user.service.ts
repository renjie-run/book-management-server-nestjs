import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (user) => user.username === createUserDto.username,
    );
    if (foundUser) {
      throw new BadRequestException('The username already exists');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;

    const updatedUsers = [...users, user];

    await this.dbService.write(updatedUsers);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (user) => user.username === loginUserDto.username,
    );

    if (!foundUser) {
      throw new BadRequestException('The user does not exist');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('The password is incorrect');
    }

    return foundUser;
  }
}
