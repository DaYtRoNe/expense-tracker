// User
export interface User {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    createdAt: string;
}

// Backend Response
export interface ApiResponse<T> {
    message: string;
    data: T;
    success: boolean;
}

// Login Response (User + Token)
export interface AuthResponse {
    user: User;
    accessToken: string;
    message: string;
}

// Register Data
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    fullName?: string;
}

// Login Data
export interface LoginData {
    email: string;
    password: string;
}