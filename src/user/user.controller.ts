import {Body, Controller, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {AuthGuard} from "@nestjs/passport";
import {GetAccount} from "../auth/get-account.decorator";
import {Account} from "../auth/account.entity";
import {User} from "./user.entity";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user-dto";

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto,
                @GetAccount() account: Account,
  ): Promise<User> {
    return this.userService.createUser(createUserDto, account);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string,
                @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
