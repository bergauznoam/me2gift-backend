import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@models/user.model';
import { UsersService } from '@services/users.service';
import { UsersController } from '@users/users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
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
