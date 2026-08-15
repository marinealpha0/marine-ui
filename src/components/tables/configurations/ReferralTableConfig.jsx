import React from "react";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";
import TableTooltip from "@components/tables/components/TableTooltip";

export const ReferralTableConfig = {
    columns: [
        { label: "Name", key: "name", width: "w-1/4" },
        { label: "Referral Code", key: "referralCode", width: "w-1/4", truncateLabel: true },
        { label: "Total Referrals", key: "totalReferrals", width: "w-1/4", truncateLabel: true },
        { label: "Earned", key: "earned", width: "w-1/4" },
    ],
    renderRow: (row, bodyCellClass) => {
        const name = row?.name || row?.userName || "";
        const referralCode = row?.referralCode || row?.userReferralCode || "";
        const totalReferrals = row?.totalReferrals ?? 0;
        const earned = row?.earned ?? row?.amountEarned ?? 0;

        return (
            <>
                <td className={bodyCellClass}>
                    <div className="flex items-center gap-3">
                        <UserAvatar name={name} />
                        <p className="text-medium truncate">{name}</p>
                    </div>
                </td>
                <td className={bodyCellClass}>{referralCode}</td>
                <td className={bodyCellClass}>{totalReferrals}</td>
                <td className={`${bodyCellClass} font-semibold text-green-600`}>
                    <TableTooltip value={`₹${earned.toLocaleString()}`} label="Earned" position="top" maxWidth="max-w-[100px]" />
                </td>
            </>
        );
    },
};
