import api from './api';
import type { DashboardData, TransactionData, Transaction } from '../types';

// Getting Dashboard Data
export const getDashboardData = async (): Promise<DashboardData> => {
    const response = await api.get('/transactions/dashboard');

    return response.data;
};

export const addTransaction = async (data: TransactionData) => {
    const response = await api.post('/transactions/add', data);
    return response.data;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get('/transactions/get-all');
    return response.data.transactions;
};

// Transaction Delete
export const deleteTransaction = async (id: string) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};

// Transaction Update
export const updateTransaction = async (id: string, data: TransactionData) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
};