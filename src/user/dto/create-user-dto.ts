import {IsEmail} from "class-validator";
import {IsVNPhoneNumber} from "../../shared/isVNPhoneNumber.decorator";

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsVNPhoneNumber()
  phone: string;
  address: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;
  @IsVNPhoneNumber()
  phone?: string;
  address?: string;
}
