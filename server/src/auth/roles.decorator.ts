import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../database/models/user.model';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
