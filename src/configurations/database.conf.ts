import { TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { appConfiguration } from './app.conf';

import { User } from '../models/user.model';

export const databaseConnection: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: appConfiguration.appName,
    entities: [User],
    synchronize: true,
    logging: true
}