export interface ErrorResponse{
    message: string;
    error: any;
}

export interface messageResponse{
    message: string;
}

export interface jwtCustomPayloadRes{
    id: number;
    email: string;
}