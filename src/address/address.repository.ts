import {EntityRepository, Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {Account} from "../auth/account.entity";
import {Address} from "./address.entity";
import {CreateAddressDto} from "./dto/create-address-dto";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {

  async getAddresses(account: Account): Promise<Address[]> {

    const query = this.createQueryBuilder('address');
    query.where({ account });

    return await query.getMany();
  }

  async createAddress(createAddressDto: CreateAddressDto, account: Account): Promise<Address> {
    const { name, description, link } = createAddressDto;

    const address = this.create({
      name,
      description,
      link,
      account,
    });

    await this.save(address);
    return address;
  }

  async deleteAddress(id: string, account: Account): Promise<void> {
    const result = await this.delete({id, account});
    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID ${id} not exist`);
    }
  }
}
