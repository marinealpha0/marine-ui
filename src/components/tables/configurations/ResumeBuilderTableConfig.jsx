import React from "react";
import ActionButtons from "@components/tables/components/ActionButtons";
import StatusChip from "@components/tables/components/StatusChip";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getSafeStatus, getStatusLabel } from "@/utils/statusUtils";

export const ResumeBuilderTableConfig = {
    columns: [
        { label: "Name", key: "name", width: "w-1/4" },
        { label: "Free Limit", key: "freeLimit", width: "w-[15%]", truncateLabel: true },
        { label: "Paid Limit", key: "paidLimit", width: "w-[15%]", truncateLabel: true },
        { label: "Status", key: "isActive", width: "w-[15%]" },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.name} label="Name" position="top" maxWidth="max-w-[160px]" triggerClass="font-semibold text-gray-700" />
            </td>
            <td className={bodyCellClass}>{row?.isFreeTier ? row?.freeLimit : "-"}</td>
            <td className={bodyCellClass}>{row?.paidLimit}</td>
            <td className={bodyCellClass}>
                <StatusChip
                    status={getSafeStatus(row?.isActive)}
                    label={getStatusLabel(row?.isActive)}
                />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} />
            </td>
        </>
    ),
};
