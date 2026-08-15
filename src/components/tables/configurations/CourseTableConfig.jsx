import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";

export const CourseTableConfig = {
    columns: [
        { label: "Course Name", key: "courseName", width: "w-[22%]", truncateLabel: true },
        { label: "Category", key: "categoryName", width: "w-[16%]" },
        { label: "Created At", key: "createdAtFormatted", width: "w-[11%]", truncateLabel: true },
        { label: "Created By", key: "createdBy", width: "w-[11%]", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[8%]" },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.courseName} label="Course Name" position="top" maxWidth="max-w-[180px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.categoryName || "-"} label="Category" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdAtFormatted} label="Created At" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdBy} label="Created By" position="top" maxWidth="max-w-[100px]" />
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
