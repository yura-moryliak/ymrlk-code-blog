import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_CHECK = 'isPublic';
export const SkipAuthCheck = () => SetMetadata(SKIP_AUTH_CHECK, true);
