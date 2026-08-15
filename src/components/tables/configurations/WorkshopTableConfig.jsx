import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import { getStatusLabel } from "@/utils/statusUtils";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const WorkshopTableConfig = {
    columns: [
        { label: "Workshop Title", key: "title", width: "w-[36%]", truncateLabel: true },
        { label: "Date", key: "workshopDate", width: "w-[12%]" },
        { label: "Timing / Duration", key: "timing", width: "w-[22%]", truncateLabel: true },
        { label: "Pricing", key: "pricing", width: "w-[10%]" },
        { label: "Reg Status", key: "registrationStatus", width: "w-[12%]" },
        { label: "Actions", key: "actions", width: "w-[8%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => {
        const timings = `${row?.startTime} - ${row?.endTime} (${row?.duration})`;
        const priceLabel = row?.pricingType === "Paid" ? `₹${row?.fee}` : "Free";
        const regStatus = row?.registrationStatus === "Open" ? "open" : "inactive";

        return (
            <>
                <td className={`${bodyCellClass} font-medium`}>
                    <TableTooltip value={row?.title} label="Workshop Title" position="top" maxWidth="max-w-[200px]" />
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={row?.workshopDate ? formatDate(row.workshopDate) : "-"} label="Date" position="top" maxWidth="max-w-[120px]" />
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={timings} label="Timing / Duration" position="top" maxWidth="max-w-[180px]" />
                </td>
                <td className={bodyCellClass}>
                    <span className={`text-sm ${row?.pricingType === "Paid" ? "font-semibold text-primary" : "text-gray-500"}`}>
                        {priceLabel}
                    </span>
                </td>
                <td className={bodyCellClass}>
                    <StatusChip status={regStatus} label={row?.registrationStatus || "Closed"} />
                </td>
                <td className={bodyCellClass}>
                    <ActionButtons {...actions} row={row} />
                </td>
            </>
        );
    },
};
