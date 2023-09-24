import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConnection } from './configurations/database.conf';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConnection,
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
