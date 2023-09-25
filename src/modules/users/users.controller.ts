import { Body, Controller, HttpStatus, NotImplementedException, Post, Res } from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { LoginDto, ResetPasswordDto } from '@DTOs/User.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { appConfiguration } from '@config/app.conf';

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
    ): Promise<Response> {
        const accessToken = await this.usersService.authenticate(loginRequest.email, loginRequest.password);
        return response.set({ [appConfiguration.jwtAccessTokenHeaderName]: accessToken }).status(HttpStatus.OK).send();
    }



    @Post("sendResetToken")
    public async sendResetToken(
        @Body() resetRequest: ResetPasswordDto,
        @Res() response: Response
    ): Promise<Response> {
        throw new NotImplementedException()
    }
}
