import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";

export const LegalPageTableConfig = {
    columns: [
        { label: "Title", key: "title", width: "w-1/4" },
        { label: "Slug", key: "slug", width: "w-1/4" },
        { label: "Created Date", key: "createdAt", width: "w-1/4", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[12.5%]" },
        { label: "Actions", key: "actions", width: "w-[12.5%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.title} label="Title" position="top" maxWidth="max-w-[150px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.slug} label="Slug" position="top" maxWidth="max-w-[150px]" triggerClass="text-gray-500 font-mono text-xs" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.createdAt} label="Created Date" position="top" maxWidth="max-w-[120px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip status={row?.status} label={getStatusLabel(row?.status)} />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} showDelete={true} />
            </td>
        </>
    ),
};
