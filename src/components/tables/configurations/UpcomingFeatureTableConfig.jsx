import React from "react";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const UpcomingFeatureTableConfig = {
    columns: [
        { label: "Title", key: "title", width: "w-1/3" },
        { label: "ETA", key: "eta", width: "w-1/4" },
        { label: "Created At", key: "createdAt", width: "w-1/4", truncateLabel: true },
        { label: "Actions", key: "actions", width: "w-[16.67%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip value={row?.title} label="Title" position="top" maxWidth="max-w-[220px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDate(row?.eta)} label="ETA" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDate(row?.createdAt)} label="Created At" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={{ ...row, status: row?.isActive ? "active" : "inactive" }}
                />
            </td>
        </>
    ),
};
