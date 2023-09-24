import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from '../../interfaces/dtos/Login.dto';
import { Response } from 'express';

@Controller()
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post("login")
    public async login(
        @Body() loginRequest: LoginDto,
        @Res() response: Response
    ): Promise<void> {
        const accessToken = await this.usersService.authenticate(loginRequest.email, loginRequest.password);
        response.set({ 'x-access-token': accessToken }).status(HttpStatus.OK).send();
    }
}
