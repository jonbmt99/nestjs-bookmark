import {Injectable, NotFoundException} from '@nestjs/common';
import {AddressRepository} from "./address.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Address} from "./address.entity";
import {Account} from "../auth/account.entity";
import {CreateAddressDto} from "./dto/create-address-dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {
  }

  getAddresses(account: Account): Promise<Address[]> {
    return this.addressRepository.getAddresses(account);
  }

  async getAddressById(id: string, account: Account): Promise<Address> {
    const found = await this.addressRepository.findOne({where: {id, account}});

    if (!found) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    return found;
  }

  createAddress(createAddressDto: CreateAddressDto, account: Account): Promise<Address> {
    return this.addressRepository.createAddress(createAddressDto, account);
  }

  async updateAddress(id: string, account: Account, name?: string, description?: string, link?: string): Promise<Address> {
    const address = await this.getAddressById(id, account);
    address.name = name ? name : address.name;
    address.description = description ? description : address.description;
    address.link = link ? link : address.link;
    await this.addressRepository.save(address);
    return address;
  }


  deleteAddress(id: string, account: Account) {
    return this.addressRepository.deleteAddress(id, account);
  }
}
