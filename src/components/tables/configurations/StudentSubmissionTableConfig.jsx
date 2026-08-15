import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import { formatDisplayDate } from "@/utils/dateUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";

export const StudentSubmissionTableConfig = {
    columns: [
        { label: "Student Name", key: "studentName", width: "w-[20%]", truncateLabel: true },
        { label: "Project", key: "projectName", width: "w-[25%]" },
        { label: "Status", key: "status", width: "w-[15%]" },
        { label: "Submitted At", key: "submittedAt", width: "w-[15%]", truncateLabel: true },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            {/* Student Name */}
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.studentName} label="Student Name" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar name={row?.studentName} />
                        <span className="truncate max-w-[120px] text-sm text-gray-900">{row?.studentName}</span>
                    </div>
                </TableTooltip>
            </td>

            {/* Project */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.projectName}
                    label="Project"
                    position="top"
                    maxWidth="max-w-[180px]"
                />
            </td>

            {/* Status */}
            <td className={bodyCellClass}>
                <StatusChip
                    status={row?.status}
                    label={getStatusLabel(row?.status)}
                />
            </td>

            {/* Submitted At */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={formatDisplayDate(row?.submittedAt)}
                    label="Submitted At"
                    position="top"
                    maxWidth="max-w-[110px]"
                />
            </td>

            {/* Actions */}
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={row}
                    showEdit={false}
                    showDelete={false}
                    showView={true}
                />
            </td>
        </>
    ),
};
