import { Request } from "express";

export namespace NUsers{
    interface ILoginUser{
        email: string;
        password: string;
    }
    interface IRegisterUser{
    username: string;
    email: string;
    password: string;
}

interface ICookieOption {
    
    httpOnly: boolean;
    secure: boolean;
    sameSite: boolean | "strict" | "lax" | "none" | undefined;
    domain: string;
    path: string;

}
    
    type TRegexPatterns = "username" | "password" | "email";


    interface RequestWithUser extends Request {
    user?: NUser_model.IUserModel;
    }
}
