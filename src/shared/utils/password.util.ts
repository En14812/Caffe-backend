import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    // Use bcrypt library to hash the password
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
    password: string,
    hashed: string,
): Promise<boolean> {
    return bcrypt.compare(password, hashed);
}
