import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "../address/address.entity";

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Address, (address) => address.account, {eager: true})
  address: Address[]
}
