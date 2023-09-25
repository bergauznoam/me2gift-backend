import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { databaseConnection } from '@config/database.conf';
import { appConfiguration } from '@config/app.conf';
import { RolesGuard } from '@guards/roles.guard';

import { UsersModule } from '@users/users.module';
import { ProductsModule } from '@products/products.module';
import { CategoriesModule } from '@categories/categories.module';
import { SubCategoriesModule } from '@subcategories/subcategories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConnection,
    }),
    JwtModule.register({
      global: true,
      secret: appConfiguration.jwtSecret,
      signOptions: { expiresIn: appConfiguration.jwtExpiry },
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule { }
