import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { AddressService } from './address.service';
import {AuthGuard} from "@nestjs/passport";
import {GetAccount} from "../auth/get-account.decorator";
import {Account} from "../auth/account.entity";
import {Address} from "./address.entity";
import {CreateAddressDto} from "./dto/create-address-dto";

@Controller('address')
@UseGuards(AuthGuard())
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  getAddresses(
           @GetAccount() account: Account
  ): Promise<Address[]> {
    return this.addressService.getAddresses(account);
  }


  @Get('/:id')
  getAddressById(@Param('id') id: string,
                 @GetAccount() account: Account)
    : Promise<Address> {
    return this.addressService.getAddressById(id, account);
  }


  @Post()
  createAddress(@Body() createAddressDto: CreateAddressDto,
             @GetAccount() account: Account,
  ): Promise<Address> {
    return this.addressService.createAddress(createAddressDto, account);
  }

  @Delete('/:id')
  deleteAddress(@Param('id') id: string,
             @GetAccount() account: Account,
  ) {
    return this.addressService.deleteAddress(id, account);
  }

  @Patch('/:id')
  updateAddress(@Param('id') id: string,
                @GetAccount() account: Account,
                @Body('name') name: string,
                @Body('description') description: string,
                @Body('link') link: string,
  ) {
    return this.addressService.updateAddress(id, account, name, description, link);
  }
}
