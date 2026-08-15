import React from "react";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import ResumeChip from "@components/tables/components/ResumeChip";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getStatusLabel } from "@/utils/statusUtils";

export const UserTableConfig = {
    columns: [
        { label: "Name", key: "name", width: "w-1/5" },
        { label: "Email", key: "email", width: "w-1/5" },
        { label: "Gender", key: "gender", width: "w-[10%]" },
        { label: "Mobile Number", key: "mobileNumber", width: "w-[15%]", truncateLabel: true },
        { label: "Resume", key: "resume", width: "w-[10%]" },
        { label: "Status", key: "userStatus", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            {/* Name */}
            <td className={bodyCellClass}>
                <TableTooltip value={row?.name} label="Name" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar name={row?.name} />
                        <p className="truncate max-w-[120px] text-sm font-medium">{row?.name}</p>
                    </div>
                </TableTooltip>
            </td>

            {/* Email */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.email}
                    label="Email"
                    position="top"
                    maxWidth="max-w-[150px]"
                    triggerClass="text-gray-500"
                />
            </td>

            {/* Gender */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.gender ? row.gender.charAt(0).toUpperCase() + row.gender.slice(1).toLowerCase() : ""}
                    label="Gender"
                    position="top"
                    maxWidth="max-w-[90px]"
                />
            </td>

            {/* Mobile Number */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.mobileNumber}
                    label="Mobile Number"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>

            {/* Resume */}
            <td className={bodyCellClass}>
                <ResumeChip resume={row?.resume} />
            </td>

            {/* Status */}
            <td className={bodyCellClass}>
                <StatusChip
                    status={row?.userStatus}
                    label={getStatusLabel(row?.userStatus)}
                />
            </td>

            {/* Actions */}
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={row}
                />
            </td>
        </>
    ),
};
