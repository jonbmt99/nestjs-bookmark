import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {AddressModule} from "./address/address.module";
import {UserModule} from "./user/user.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'P@ssword123',
    //   database: 'bookmark',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   }
    // ),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    AddressModule,
    UserModule,
  ],
})
export class AppModule {
}
