import { Injectable } from '@nestjs/common';

type AuthInput = {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    async validateUser(
        input: AuthInput
    ) {
        
    }
}
