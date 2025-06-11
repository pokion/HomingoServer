export interface ErrorResponse{
    message: string;
    error: any;
}

export interface messageResponse{
    message: string;
}

export interface jwtCustomPayloadRes extends JwtPayload{
    id: number;
    email: string;
}