import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../auth/account.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToOne(() => Account, account => account.user)
  account: Account
}
