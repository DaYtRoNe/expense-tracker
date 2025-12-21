import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPlus, FiLoader } from 'react-icons/fi';
import { getDashboardData, getAllTransactions, deleteTransaction } from '../services/transaction.service'; // Service imports updated
import type { DashboardData, Transaction } from '../types'; // Type imports updated
import toast from 'react-hot-toast';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionCard from '../components/TransactionCard';
import ExpenseChart from '../components/ExpenseChart';

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Data Fetching Logic (Summary + List)
    const fetchData = async () => {
        try {

            const [summary, list] = await Promise.all([
                getDashboardData(),
                getAllTransactions()
            ]);

            setDashboardData(summary);
            setTransactions(list);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    // Delete Logic
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;

        try {
            await deleteTransaction(id);
            toast.success("Transaction deleted");

            fetchData();
        } catch (error) {
            toast.error("Failed to delete transaction");
            console.log(error);

        }
    };

    const handleAddTransaction = () => {
        setTransactionToEdit(null); // පරණ data මුකුත් නෑ
        setIsModalOpen(true);
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setTransactionToEdit(transaction); // Edit කරන්න ඕන එක දානවා
        setIsModalOpen(true); // Modal එක අරිනවා
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-500 mt-1">Overview of your financial status.</p>
                    </div>
                    <button
                        onClick={handleAddTransaction}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <FiPlus />
                        <span>Add Transaction</span>
                    </button>
                </div>

                {/* Loading State Check */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <FiLoader className="animate-spin text-3xl text-indigo-600" />
                    </div>
                ) : (
                    <>
                        {/* Stats Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                            {/* Total Balance */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl">
                                        <FiDollarSign />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Total Balance</p>
                                        <h3 className="text-2xl font-bold text-slate-900">
                                            {dashboardData ? formatCurrency(dashboardData.balance) : 'LKR 0.00'}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Total Income */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                                        <FiTrendingUp />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Total Income</p>
                                        <h3 className="text-2xl font-bold text-emerald-600">
                                            {dashboardData ? formatCurrency(dashboardData.totalIncome) : 'LKR 0.00'}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Total Expense */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-2xl">
                                        <FiTrendingDown />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Total Expense</p>
                                        <h3 className="text-2xl font-bold text-red-600">
                                            {dashboardData ? formatCurrency(dashboardData.totalExpense) : 'LKR 0.00'}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Transactions List Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Transaction List */}
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>

                                {transactions.length === 0 ? (
                                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 text-2xl">
                                            <FiDollarSign />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">No transactions yet</h3>
                                        <p className="text-slate-500 mt-2">Add your first transaction.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {transactions.map((transaction) => (
                                            <TransactionCard
                                                key={transaction._id}
                                                transaction={transaction}
                                                onDelete={handleDelete}
                                                onEdit={handleEditTransaction}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Chart Component */}
                            <div className="lg:col-span-1">
                                <ExpenseChart transactions={transactions} />

                                <div className="mt-6 bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-lg mb-2">Pro Tip 💡</h4>
                                        <p className="text-indigo-200 text-sm">
                                            Try to keep your "Food" expenses under 20% of your total income to save more this month!
                                        </p>
                                    </div>
                                    {/* Decoration Circle */}
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                                </div>
                            </div>

                        </div>
                    </>
                )}

            </main>

            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchData}
                transactionToEdit={transactionToEdit}
            />
        </div>
    );
};

export default Dashboard;