interface User {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: Number;
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    expiresIn: number;
    data: {
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    first_name: String;
    last_name: String;
    middle_name?: String;
    address: String;
    phone: Number;
    email: String;
    password: String;
}

interface RegisterResponse {
    success: boolean;
    message: string;
    token: string;
    expiresIn: number;
    data: {
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: Number;
    };
}

export {
    User,
    LoginResponse,
    LoginCredentials,
    RegisterCredentials,
    RegisterResponse
};
