export class UnauthorizedException extends Error {
    public statusCode: number;
    constructor(message: string = 'Unauthorized!') {
        super(message);
        this.statusCode = 401;
    }
}
