import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "../address/address.entity";
import {User} from "../user/user.entity";

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

  @OneToOne(() => User, user => user.account)
  @JoinColumn()
  user: User
}
