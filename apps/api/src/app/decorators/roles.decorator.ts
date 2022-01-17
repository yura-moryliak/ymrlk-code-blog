import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '@ymrlk-code-blog/data';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
