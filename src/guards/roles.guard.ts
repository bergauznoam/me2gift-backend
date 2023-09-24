import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_ROLE_KEY } from 'src/roles.decorator';
import { User } from 'src/models/user.model';
import { DataSource } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private dataSource: DataSource,
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAdminRequired = this.reflector.getAllAndOverride<boolean>(ADMIN_ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!isAdminRequired) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers['x-access-token'];
        if (!accessToken) {
            return false;
        }
        const payload = this.jwtService.decode(accessToken);
        if (typeof payload === 'object') {
            const userId = payload.sub;
            const user = await this.dataSource.manager.findOne(User, { where: { id: userId } });
            return user?.isAdmin === isAdminRequired;
        }
        return false;
    }
}