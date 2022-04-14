import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AddressRepository} from "./address.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository]),
    AuthModule,
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
