import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {AddressModule} from "./address/address.module";
import {UserModule} from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'P@ssword123',
      database: 'bookmark',
      autoLoadEntities: true,
      synchronize: true,
      }
    ),
    AuthModule,
    AddressModule,
    UserModule,
  ],
})
export class AppModule {
}
