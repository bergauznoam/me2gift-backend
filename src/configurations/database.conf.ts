import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '@models/user.model';
import { Product } from '@models/product.model';
import { Category } from '@models/category.model';
import { SubCategory } from '@models/subcategory.model';
import { Order } from '@models/order.model';

export const databaseConnection: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_ENABLE_LOGGING === 'true',
    entities: [User, Product, Category, SubCategory, Order],
    synchronize: true,
}