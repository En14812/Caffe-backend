import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from '../auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync<{
                sub: string;
                name: string;
                role: string;
            }>(token);

            request.user = {
                sub: tokenPayload.sub,
                name: tokenPayload.name,
                role: tokenPayload.role,
            } satisfies AuthenticatedUser;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
