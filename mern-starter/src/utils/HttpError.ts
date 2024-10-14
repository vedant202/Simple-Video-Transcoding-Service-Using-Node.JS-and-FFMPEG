export default class HttpError extends Error{
    message: string;
    statusCode:Number;

    constructor(message:string,statusCode:Number){
        super();
        this.message =message;
        this.statusCode = statusCode;
    }
}