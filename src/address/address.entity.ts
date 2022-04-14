import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../auth/account.entity";
import {Exclude} from "class-transformer";

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToOne((_type) => Account, (account) => account.address, {eager: false})
  @Exclude({ toPlainOnly: true})
  account: Account;
}
