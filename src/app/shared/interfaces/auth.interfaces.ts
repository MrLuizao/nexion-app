export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: number;
        email: string;
        name: string;
    };
    token: string;
}

export interface DecodedToken {
    sub: string;
    email: string;
    exp: number;
    iat: number;
}