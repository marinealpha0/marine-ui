import React from "react";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";

export const FaqTableConfig = {
    columns: [
        { label: "Question", key: "question", width: "w-1/3" },
        { label: "Category", key: "categoryName", width: "w-1/6" },
        { label: "Created By", key: "createdBy", width: "w-1/6", truncateLabel: true },
        { label: "Created Date", key: "createdAtFormatted", width: "w-1/6", truncateLabel: true },
        { label: "Status", key: "status", width: "w-1/12" },
        { label: "Actions", key: "actions", width: "w-1/12", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.question} label="Question" position="top" maxWidth="max-w-[220px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.categoryName || "-"} label="Category" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdBy || "-"} label="Created By" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass} suppressHydrationWarning>
                <TableTooltip
                    value={row?.createdAtFormatted || formatDate(row?.createdAt)}
                    label="Created Date"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>
            <td className={bodyCellClass}>
                <StatusChip status={row?.status} label={getStatusLabel(row?.status)} />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} showDelete={false} />
            </td>
        </>
    ),
};
