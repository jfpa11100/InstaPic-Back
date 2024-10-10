export class JwtPayload{
    user: string;
    id: string;
    iat?: number;
    exp?: number;
}