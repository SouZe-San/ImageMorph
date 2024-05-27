
export namespace NUser_model{
    interface IJwtPayload{
    _id: Types.ObjectId;
    email: string;
    username: string;

}

interface IRefreshTokenPayload{
     _id: Types.ObjectId;
}

interface IUserModel{
    username: string;
    fullName: string;
    email: string;
    password: string;
    refreshToken:string;
    generateAccessToken(): string;
    isPasswordCorrect(password:string):  Promise<boolean>;
    generateRefreshToken():string;
}


}



