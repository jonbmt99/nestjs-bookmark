import {Body, Controller, Post} from '@nestjs/common';
import {AuthCredentialsDto, CreateAccountDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createAccountDto: CreateAccountDto): Promise<void> {
    return this.authService.signUp(createAccountDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

}
