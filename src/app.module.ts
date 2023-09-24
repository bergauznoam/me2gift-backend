import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { databaseConnection } from './configurations/database.conf';
import { appConfiguration } from './configurations/app.conf';
import { RolesGuard } from './guards/roles.guard';

import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubCategoriesModule } from './modules/subcategories/subcategories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConnection,
    }),
    JwtModule.register({
      global: true,
      secret: appConfiguration.jwtSecret,
      signOptions: { expiresIn: '60m' },
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
