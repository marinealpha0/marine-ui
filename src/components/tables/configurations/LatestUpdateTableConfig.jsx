import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getSafeStatus, getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const LatestUpdateTableConfig = {
    columns: [
        { label: "Title", key: "title", width: "w-1/4" },
        { label: "Version", key: "version", width: "w-[12.5%]" },
        { label: "Tags", key: "tags", width: "w-1/4" },
        { label: "Released At", key: "releasedAt", width: "w-[12.5%]", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[12.5%]" },
        { label: "Actions", key: "actions", width: "w-[12.5%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={`${bodyCellClass} font-medium`}>
                <TableTooltip
                    value={row?.title}
                    label="Title"
                    position="top"
                    maxWidth="max-w-[160px]"
                />
            </td>
            <td className={bodyCellClass}>{row?.version || "-"}</td>
            <td className={bodyCellClass}>
                {row?.tags && row.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {row.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                        {row.tags.length > 2 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
                                +{row.tags.length - 2}
                            </span>
                        )}
                    </div>
                ) : (
                    "-"
                )}
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={formatDate(row?.releasedAt)} label="Released At" position="top" maxWidth="max-w-[110px]" />
            </td>
            <td className={bodyCellClass}>
                <StatusChip
                    status={getSafeStatus(row?.isActive)}
                    label={getStatusLabel(row?.isActive)}
                />
            </td>
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={{
                        ...row,
                        status: getSafeStatus(row?.isActive)
                    }}
                />
            </td>
        </>
    ),
};
