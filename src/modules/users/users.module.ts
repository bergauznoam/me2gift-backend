import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { appConfiguration } from '../../configurations/app.conf';
import { User } from '../../models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: appConfiguration.jwtSecret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {
    constructor(
        private readonly usersService: UsersService
    ) {
        this.usersService.createAdminUser();
    }
}
