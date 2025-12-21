import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiType, FiTag, FiAlignLeft } from 'react-icons/fi';
import Modal from './Modal';
import { addTransaction, updateTransaction } from '../services/transaction.service'; // updateTransaction import කළා
import toast from 'react-hot-toast';
import type { Transaction } from '../types';

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    transactionToEdit?: Transaction | null;
}

const AddTransactionModal = ({ isOpen, onClose, onSuccess, transactionToEdit }: AddTransactionModalProps) => {
    const [loading, setLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (transactionToEdit) {
            setTitle(transactionToEdit.title);
            setAmount(transactionToEdit.amount.toString());
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(transactionToEdit.date ? new Date(transactionToEdit.date).toISOString().split('T')[0] : '');
            setDescription(transactionToEdit.description || '');
        } else {
            resetForm();
        }
    }, [transactionToEdit, isOpen]);

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setType('expense');
        setCategory('');
        setDate('');
        setDescription('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !amount || !category) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            setLoading(true);
            const transactionData = {
                title,
                amount: Number(amount),
                type,
                category,
                date: date || new Date(),
                description
            };

            if (transactionToEdit) {
                await updateTransaction(transactionToEdit._id, transactionData);
                toast.success("Transaction updated successfully");
            } else {
                await addTransaction(transactionData);
                toast.success("Transaction added successfully");
            }

            resetForm();
            onSuccess();
            onClose();

        } catch (error) {
            console.error(error);
            toast.error(transactionToEdit ? "Failed to update" : "Failed to add");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={transactionToEdit ? "Edit Transaction" : "Add New Transaction"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Type Selection */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Income
                    </button>
                </div>

                {/* Title */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                    <div className="relative">
                        <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Grocery Shopping" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm" />
                    </div>
                </div>

                {/* Amount */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount (LKR)</label>
                    <div className="relative">
                        <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm" />
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
                    <div className="relative">
                        <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm appearance-none">
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Salary">Salary</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description (Optional)</label>
                    <div className="relative">
                        <FiAlignLeft className="absolute left-3 top-3 text-slate-400" />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Add some notes..." rows={3} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm resize-none" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 mt-4">
                    {loading ? 'Processing...' : (transactionToEdit ? 'Update Transaction' : 'Add Transaction')}
                </button>
            </form>
        </Modal>
    );
};

export default AddTransactionModal;