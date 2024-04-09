interface registerUser{
    username: string;
    fullName: string;
    email: string;
    password: string;
}

namespace models{
    interface LoginUser{
        username: string;
        email: string;
        password: string;
    }
}