export type SignInData = {
    userId: string;
    name: string;
    role: string;
};

export type AuthResponse = {
    message: string;
    statusCode: string;
    meta: any;
    data: {
        user: {
            type: string;
            id: string;
            name: string;
            role: string;
        };
        access_token: string;
    };
};

export type AuthenticatedUser = {
    sub: string;
    name: string;
    role: string;
};

export type CurrentUserResponse = {
    message: string;
    statusCode: string;
    meta: any;
    data: {
        type: string;
        id: string;
        name: string;
        role: string;
    };
};
