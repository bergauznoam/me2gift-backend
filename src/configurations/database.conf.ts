import { resolve } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { SubCategory } from '../models/subcategory.model';

import * as dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, `../env/${process.env.NODE_ENV || 'development'}.env`), processEnv: process.env })

export const databaseConnection: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Product, Category, SubCategory],
    synchronize: true,
    logging: process.env.DATABASE_ENABLE_LOGGING === 'true'
}