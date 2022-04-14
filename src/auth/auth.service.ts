import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AccountRepository} from "./account.repository";
import {AuthCredentialsDto, CreateAccountDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createAccountDto: CreateAccountDto): Promise<void> {
    return this.accountRepository.createAccount(createAccountDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const account = await this.accountRepository.findOne({username});

    if (account && (await bcrypt.compare(password, account.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken }
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
