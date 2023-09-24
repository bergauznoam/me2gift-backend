import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLE_KEY = 'admin_role';

export const AdminPermission = () => SetMetadata(ADMIN_ROLE_KEY, true);