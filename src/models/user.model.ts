import {
    Entity,
    Column,
    BeforeInsert,
    Unique
} from 'typeorm';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumberString,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

import { appConfiguration } from '@config/app.conf';
import { BaseModel } from "@models/_base.model";
import { UserDto } from '@DTOs/User.dto';

@Entity({ name: "users" })
@Unique('email_unique_constraint', ['email'])
export class User extends BaseModel {
    @Column()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column({ default: false })
    @IsBoolean()
    isAdmin: boolean;

    @Column({ nullable: true })
    @IsString()
    resetToken: string;

    @Column({ nullable: true })
    @IsNumberString()
    otpCode: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(appConfiguration.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }

    public format(): UserDto {
        return {
            id: this.id,
            email: this.email,
            isAdmin: this.isAdmin,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    public async isPasswordValid(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public updatePassword(password: string): void {
        this.password = password;
        this.resetToken = null;
        this.otpCode = null;
    }

    public updateOTPCode(code: string): void {
        this.otpCode = code;
        this.resetToken = null;
    }

    public updateResetToken(token: string): void {
        this.resetToken = token;
        this.otpCode = null;
    }
}
