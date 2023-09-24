import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
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


@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(appConfiguration.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
}
