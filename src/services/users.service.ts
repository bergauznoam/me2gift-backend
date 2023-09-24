import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InvalidUserPasswordError } from '@root/exceptions';
import { User } from '@models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    public async createAdminUser(): Promise<void> {
        let admin = await this.usersRepository.findOne({ where: { isAdmin: true } });
        if (!admin) {
            admin = new User();
            admin.email = "admin@me2gift.com";
            admin.password = "admin"
            admin.isAdmin = true;
            await this.usersRepository.save(admin);
        }
    }

    public async authenticate(email: string, password: string): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { email: email } });
        if (!user) {
            throw new InvalidUserPasswordError();
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new InvalidUserPasswordError();
        }
        const payload = { sub: user.id };
        return await this.jwtService.signAsync(payload);
    }
}
