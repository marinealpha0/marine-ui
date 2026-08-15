import React from "react";
import CompanyAvatar from "@components/tables/components/CompanyAvatar";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatPackage } from "@/Hooks/useJobs";
import { getStatusLabel } from "@/utils/statusUtils";

export const PostTableConfig = {
    columns: [
        { label: "Company", key: "company", width: "w-1/5" },
        { label: "Role", key: "role", width: "w-[15%]" },
        { label: "Package", key: "package", sortKey: "package.range", width: "w-[15%]" },
        { label: "Date", key: "date", width: "w-[10%]" },
        { label: "Location", key: "location", width: "w-[10%]" },
        { label: "Status", key: "status", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            {/* Company */}
            <td className={bodyCellClass}>
                <TableTooltip value={row?.company} label="Company" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <CompanyAvatar name={row?.company} logo={row?.companyLogo} />
                        <p className="truncate max-w-[120px] text-sm font-medium">{row?.company}</p>
                    </div>
                </TableTooltip>
            </td>

            {/* Role */}
            <td className={`${bodyCellClass} text-medium`}>
                <TableTooltip
                    value={row?.role}
                    label="Role"
                    position="top"
                    maxWidth="max-w-[110px]"
                />
            </td>

            {/* Package */}
            <td className={`${bodyCellClass} text-green-600 font-semibold`}>
                <TableTooltip
                    value={row?.package !== "Not Specified" ? formatPackage(row?.package) : "-"}
                    label="Package"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>

            {/* Date */}
            <td className={bodyCellClass}>
                <TableTooltip value={row?.date} label="Date" position="top" maxWidth="max-w-[100px]" />
            </td>

            {/* Location */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.location}
                    label="Location"
                    position="top"
                    maxWidth="max-w-[90px]"
                />
            </td>

            {/* Status */}
            <td className={bodyCellClass}>
                <StatusChip status={row?.status} label={getStatusLabel(row?.status)} />
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
