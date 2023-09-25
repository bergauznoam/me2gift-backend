import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { LoginDto } from '@DTOs/User.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("Users")
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
