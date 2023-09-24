import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConnection } from './configurations/database.conf';

import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConnection,
    }),

    UsersModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
