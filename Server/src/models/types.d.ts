
export namespace NUser_model{
    interface IJwtPayload{
    _id: Types.ObjectId;
    email: string;
    username: string;

}
interface IUserModel{
    username: string;
    fullName: string;
    email: string;
    password: string;
    generateAccessToken(): string;
    isPasswordCorrect(password:string):  Promise<boolean>;

}
}



