interface User {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: number;
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
    first_name: string;
    last_name: string;
    middle_name?: string;
    address: string;
    phone: number;
    email: string;
    password: string;
    state: string;
    image: File[];
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
        phone: number;
    };
}

export {
    User,
    LoginResponse,
    LoginCredentials,
    RegisterCredentials,
    RegisterResponse
};
