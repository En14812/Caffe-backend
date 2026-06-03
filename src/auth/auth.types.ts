export type SignInData = {
    userId: string;
    name: string;
};

export type AuthResponse = {
    accessToken: string;
    userId: string;
    name: string;
};

export type AuthenticatedUser = {
    userId: string;
    name: string;
};
