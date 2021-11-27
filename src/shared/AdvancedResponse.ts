export class AdvancedResponse<T> implements ApiResponse<T> {
    public data: T;
    public message: ResponseMessage;
    constructor({
        data,
        message = 'ok',
    }: {
        data?: T;
        message?: ResponseMessage;
    }) {
        this.data = data;
        this.message = message;
    }
}
