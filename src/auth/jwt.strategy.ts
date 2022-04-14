import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountRepository} from "./account.repository";
import {JwtPayload} from "./jwt-payload.interface";
import {Account} from "./account.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<Account> {
    const { username } = payload;
    const account: Account = await this.accountRepository.findOne( {username});

    if (!account) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
