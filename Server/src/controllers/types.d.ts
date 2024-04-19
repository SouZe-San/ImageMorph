

export namespace NUsers{
    interface ILoginUser{
        username: string;
        email: string;
        password: string;
    }
    interface IRegisterUser{
    username: string;
    fullName: string;
    email: string;
    password: string;
}

    type TRegexPatterns = "username" | "password" | "email" | "fullName";
}