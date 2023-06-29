import { SetMetadata } from '@nestjs/common';
import { RoleUser } from 'src/modules/core/auth/dto/auth.dto';

export const ROLES_KEY = 'role';
export const Roles = (...role: RoleUser[]) => SetMetadata(ROLES_KEY, role);
