export class BadRequestException extends Error {
    public statusCode: number;
    constructor(message: string = 'Bad request!') {
        super(message);
        this.statusCode = 400;
    }
}
