import { TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { appConfiguration } from './app.conf';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { SubCategory } from '../models/subcategory.model';

export const databaseConnection: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: appConfiguration.appName,
    entities: [User, Product, Category, SubCategory],
    synchronize: true,
}