import React from 'react';
import { FileText, X } from '@/assets/icons';

const ResumeChip = React.memo(({ resume }) => {
    const isYes = resume === 'Yes';

    const classes = isYes
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-gray-50 text-gray-500 border-gray-200';

    const Icon = isYes ? FileText : X;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-medium text-xs tracking-wide shadow-sm ${classes}`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="truncate">{resume}</span>
        </div>
    );
});

export default ResumeChip;
