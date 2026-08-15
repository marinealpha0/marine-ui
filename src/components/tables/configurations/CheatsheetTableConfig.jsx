import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const CheatsheetTableConfig = {
    columns: [
        { label: "Heading", key: "heading", width: "w-1/3" },
        { label: "Category", key: "categoryName", width: "w-1/7" },
        { label: "Created By", key: "topicCreatedBy", width: "w-1/10", truncateLabel: true },
        { label: "Created Date", key: "topicCreatedAt", width: "w-1/10", truncateLabel: true },
        { label: "Status", key: "status", width: "w-1/12" },
        { label: "Actions", key: "actions", width: "w-1/12", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.heading} label="Heading" position="top" maxWidth="max-w-[280px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.categoryName} label="Category" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.topicCreatedBy ? `${row.topicCreatedBy.firstName} ${row.topicCreatedBy.lastName}` : "-"}
                    label="Created By"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDate(row?.topicCreatedAt)} label="Created Date" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip status={row?.status} label={getStatusLabel(row?.status)} />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} />
            </td>
        </>
    ),
};
