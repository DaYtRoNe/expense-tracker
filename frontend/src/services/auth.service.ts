import api from './api';
import type { AuthResponse, RegisterData, LoginData } from '../types';


// Register Function
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users/register', data);
    return response.data;
};

// Login Function
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
};