import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../models/user.model';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


}
