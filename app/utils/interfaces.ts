export interface ILoginResponse {
    sessionId : string;
}

export interface IErrorObject{
    message ?: string;
}

export interface IResponse{
    messages : Array<IErrorObject>;
    code : number;
}