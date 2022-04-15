import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user-dto";
import {Account} from "../auth/account.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserDto: CreateUserDto, account: Account): Promise<User> {
    const { email, phone, address } = createUserDto;

    const user = this.create({
      email,
      phone,
      address,
      account,
    });

    await this.save(user);
    return user;
  }



}
