import React from 'react';
import { ShoppingCart, RotateCcw, HelpCircle } from '@/assets/icons';

const TransactionTypeChip = React.memo(({ transactionType }) => {
    const getTypeConfig = (type) => {
        const normalizedType = type?.toLowerCase() || '';
        if (normalizedType.includes('purchase')) {
            return {
                classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                icon: ShoppingCart,
                label: 'Purchase'
            };
        } else if (normalizedType.includes('refund')) {
            return {
                classes: 'bg-rose-50 text-rose-700 border-rose-200',
                icon: RotateCcw,
                label: 'Refund'
            };
        } else {
            const formattedLabel = normalizedType
                .split(/[_-]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            return {
                classes: 'bg-gray-50 text-gray-500 border-gray-200',
                icon: HelpCircle,
                label: formattedLabel || type || 'Unknown'
            };
        }
    };

    const { classes, icon: Icon, label } = getTypeConfig(transactionType);

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-medium text-xs tracking-wide shadow-sm ${classes}`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="truncate">{label}</span>
        </div>
    );
});

export default TransactionTypeChip;
