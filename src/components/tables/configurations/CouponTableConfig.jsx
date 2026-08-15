import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getSafeStatus, getStatusLabel } from "@/utils/statusUtils";
import { formatDisplayDate } from "@/utils/dateUtils";

export const CouponTableConfig = {
    columns: [
        { label: "Coupon", key: "couponCode", width: "w-1/5" },
        { label: "Discount", key: "discountPercentage", width: "w-[15%]" },
        { label: "Valid Until", key: "validUntil", width: "w-1/5", truncateLabel: true },
        { label: "Limit", key: "usageLimit", width: "w-[15%]" },
        { label: "Status", key: "isActive", width: "w-[15%]" },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={bodyCellClass}>
                <TableTooltip value={row.couponCode} label="Coupon Code" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={`${row.discountPercentage}`} label="Discount" position="top" maxWidth="max-w-[100px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDisplayDate(row.validUntil)} label="Valid Until" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row.usageLimit} label="Usage Limit" position="top" maxWidth="max-w-[100px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip
                    status={getSafeStatus(row.isActive)}
                    label={getStatusLabel(row.isActive)}
                />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} />
            </td>
        </>
    ),
};
