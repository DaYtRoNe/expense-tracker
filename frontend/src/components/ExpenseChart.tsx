import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Transaction } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
    transactions: Transaction[];
}

const ExpenseChart = ({ transactions }: ExpenseChartProps) => {

    const expenses = transactions.filter(t => t.type === 'expense');

    const categoryTotals: { [key: string]: number } = {};

    expenses.forEach(expense => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }
    });

    const chartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals), // Amounts
                backgroundColor: [
                    '#6366f1', // Indigo (Theme Color)
                    '#ec4899', // Pink
                    '#10b981', // Emerald
                    '#f59e0b', // Amber
                    '#ef4444', // Red
                    '#8b5cf6', // Violet
                    '#3b82f6', // Blue
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    // Chart Options
    const options = {
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 12 }
                }
            }
        },
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
    };

    if (expenses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-white rounded-2xl border border-slate-100">
                <p>No expense data to display</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Expense Breakdown</h3>
            <div className="h-60">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ExpenseChart;