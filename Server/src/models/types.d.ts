
export interface UserModel{
    username: string;
    fullName: string;
    email: string;
    password: string;
    generateAccessToken(): string;
    isPasswordCorrect(password:string):  Promise<boolean>;

}



