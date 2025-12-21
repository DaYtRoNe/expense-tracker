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

// Dashboard Data
export interface DashboardData {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
}

// Transaction Form Data
export interface TransactionData{
    title: string;
    amount: number;
    type: 'income' | 'expense' | string;
    category: string;
    description: string;
    date: string |Date;
}

export interface Transaction {
    _id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category: string;
    description?: string;
}