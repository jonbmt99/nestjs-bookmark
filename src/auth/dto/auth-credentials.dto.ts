import {IsString, MaxLength, MinLength} from 'class-validator'
import {Match} from "../../shared/match.decorator";
export class AuthCredentialsDto{

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

}

export class CreateAccountDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', {message: 'password not match'})
  confirmPassword: string;
}
