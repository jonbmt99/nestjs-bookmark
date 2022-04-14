import {EntityRepository, Repository} from "typeorm";
import {Account} from "./account.entity";
import {CreateAccountDto} from "./dto/auth-credentials.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account>{

  async createAccount(createAccountDto: CreateAccountDto): Promise<void> {
    const { username, password } = createAccountDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const account = this.create({ username, password: hashedPassword});

    try {
      await this.save(account);
    } catch (error) {
      if (error.code === '23505') { // 23505 is code duplicate error
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
