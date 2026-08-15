import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getStatusLabel } from "@/utils/statusUtils";

export const SubscriptionTableConfig = {
    columns: [
        { label: "Plan Name", key: "membershipName", width: "w-[22%]", truncateLabel: true },
        { label: "Category", key: "categoryName", width: "w-[16%]", truncateLabel: true },
        { label: "Actual Price", key: "actualPrice", width: "w-[12%]", truncateLabel: true },
        { label: "Offer Price", key: "offerPrice", width: "w-[12%]", truncateLabel: true },
        { label: "Duration", key: "duration", width: "w-[11%]" },
        { label: "Status", key: "status", width: "w-[12%]" },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} text-medium`}>
                <TableTooltip value={row.membershipName} label="Plan Name" position="top" maxWidth="max-w-[220px]" />
            </td>
            <td className={`${bodyCellClass} text-gray-500`}>
                <TableTooltip value={row.categoryName || "-"} label="Category" position="top" maxWidth="max-w-[170px]" />
            </td>
            <td className={`${bodyCellClass} text-gray-500 line-through`}>
                <TableTooltip value={`₹${row.actualPrice?.toLocaleString()}`} label="Actual Price" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={`${bodyCellClass} font-semibold text-green-600`}>
                <TableTooltip value={`₹${row.offerPrice?.toLocaleString()}`} label="Offer Price" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={`${row.duration} Months`} label="Duration" position="top" maxWidth="max-w-[100px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip
                    status={row.status}
                    label={getStatusLabel(row.status)}
                />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} />
            </td>
        </>
    ),
};
