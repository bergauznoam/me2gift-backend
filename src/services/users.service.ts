import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InvalidUser, InvalidUserPasswordError } from '@root/exceptions';
import { User } from '@models/user.model';
import { CRUDService } from './crud.service';

@Injectable()
export class UsersService extends CRUDService(User) {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { super(); }

    public async createAdminUser(): Promise<void> {
        let admin = await this.repository.findOne({ where: { isAdmin: true } });
        if (!admin) {
            admin = new User();
            admin.email = "admin@me2gift.com";
            admin.password = "admin"
            admin.isAdmin = true;
            await this.usersRepository.save(admin);
        }
    }

    public async authenticate(email: string, password: string): Promise<string> {
        const user = await this.repository.findOne({ where: { email: email } });
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

    public async sendOTPVerification(email: string): Promise<void> {
        throw new NotImplementedException();
    }

    public async resetPassword(email: string): Promise<void> {
        const user = await this.repository.findOne({ where: { email: email } });
        if (!user) {
            throw new InvalidUser();
        }
        const payload = { id: user.id, createdAt: new Date() };
        const resetToken = await this.jwtService.signAsync(payload);
        user.updateResetToken(resetToken);
        await this.usersRepository.save(user);
    }
}
