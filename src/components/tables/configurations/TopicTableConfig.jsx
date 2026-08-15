import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getSafeStatus, getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";

export const TopicTableConfig = {
    columns: [
        { label: "Title", key: "title", width: "w-[25%]" },
        { label: "Course Title", key: "courseTitle", width: "w-[20%]", truncateLabel: true },
        { label: "Created At", key: "createdAtFormatted", width: "w-[15%]", truncateLabel: true },
        { label: "Created By", key: "createdBy", width: "w-[15%]", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.title} label="Title" position="top" maxWidth="max-w-[180px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.courseTitle || "-"} label="Course Title" position="top" maxWidth="max-w-[150px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdAtFormatted} label="Created At" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdBy} label="Created By" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip
                    status={getSafeStatus(row?.status)}
                    label={getStatusLabel(row?.status)}
                />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} showDelete={false} />
            </td>
        </>
    ),
};
