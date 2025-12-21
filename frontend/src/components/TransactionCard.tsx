import { FiTrendingDown, FiTrendingUp, FiTrash2, FiCalendar, FiEdit2 } from 'react-icons/fi';
import type { Transaction } from '../types';

interface TransactionCardProps {
    transaction: Transaction;
    onDelete: (id: string) => void;
    onEdit: (transaction: Transaction) => void;
}

const TransactionCard = ({ transaction, onDelete, onEdit }: TransactionCardProps) => {
    const isIncome = transaction.type === 'income';

    return (
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">

            {/* Left Side */}
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {isIncome ? <FiTrendingUp /> : <FiTrendingDown />}
                </div>
                <div>
                    <h4 className="font-semibold text-slate-800">{transaction.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                            {transaction.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <FiCalendar />
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
                <span className={`font-bold text-lg ${isIncome ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                    {isIncome ? '+' : '-'} LKR {transaction.amount.toLocaleString()}
                </span>

                {/* Action Buttons Container */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* EDIT BUTTON */}
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Transaction"
                    >
                        <FiEdit2 />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                        onClick={() => onDelete(transaction._id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Transaction"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;