import {Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "../auth/account.entity";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user-dto";
import {User} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  createUser(createUserDto: CreateUserDto, account: Account): Promise<User> {
    return this.userRepository.createUser(createUserDto, account);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne({where: {id}});

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    const {email, phone, address} = updateUserDto;
    const user = await this.getUserById(id);
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.address = address ? address : user.address;
    await this.userRepository.save(user);
    return user;
  }
}
