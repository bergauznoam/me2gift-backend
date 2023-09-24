import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert
} from 'typeorm';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsBoolean,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

import { appConfiguration } from '@config/app.conf';
import { BaseModel } from "@models/_base.model";

@Entity({ name: "users" })
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

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(appConfiguration.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
}
