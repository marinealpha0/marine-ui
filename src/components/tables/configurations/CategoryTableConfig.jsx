import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const CategoryTableConfig = {
    columns: [
        { label: "Category Name", key: "categoryName", width: "w-1/4", truncateLabel: true },
        { label: "Created By", key: "createdBy", width: "w-1/4", truncateLabel: true },
        { label: "Created Date", key: "createdAt", width: "w-1/4", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[12.5%]" },
        { label: "Actions", key: "actions", width: "w-[12.5%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.categoryName} label="Category Name" position="top" maxWidth="max-w-[150px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.createdBy ? `${row.createdBy.firstName} ${row.createdBy.lastName}` : "-"}
                    label="Created By"
                    position="top"
                    maxWidth="max-w-[130px]"
                />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDate(row?.createdAt)} label="Created Date" position="top" maxWidth="max-w-[120px]" />
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
