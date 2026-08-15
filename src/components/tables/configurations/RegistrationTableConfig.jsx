import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { formatDate } from "@/utils/dateUtils";

export const RegistrationTableConfig = {
    columns: [
        { label: "Student Name", key: "studentName", width: "w-[16%]", truncateLabel: true },
        { label: "Email", key: "studentEmail", width: "w-[20%]", truncateLabel: true },
        { label: "Mobile Number", key: "studentPhone", width: "w-[12%]" },
        { label: "Workshop Title", key: "workshopTitle", width: "w-[22%]", truncateLabel: true },
        { label: "Register Date", key: "registerDate", width: "w-[12%]" },
        { label: "Attendance Status", key: "attendanceStatus", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[8%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => {
        let statusStyle = "registered";
        if (row?.attendanceStatus === "Attended") {
            statusStyle = "success";
        } else if (row?.attendanceStatus === "Absent") {
            statusStyle = "inactive";
        }

        return (
            <>
                <td className={`${bodyCellClass} font-medium`}>
                    <TableTooltip value={row?.studentName} label="Student Name" position="top" maxWidth="max-w-[150px]" />
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={row?.studentEmail} label="Email" position="top" maxWidth="max-w-[150px]" />
                </td>
                <td className={bodyCellClass}>
                    <span className="text-sm text-gray-700">{row?.studentPhone || "-"}</span>
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={row?.workshopTitle} label="Workshop Title" position="top" maxWidth="max-w-[200px]" />
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={row?.registerDate ? formatDate(row.registerDate) : "-"} label="Register Date" position="top" maxWidth="max-w-[120px]" />
                </td>
                <td className={bodyCellClass}>
                    <StatusChip status={statusStyle} label={row?.attendanceStatus || "Registered"} />
                </td>
                <td className={bodyCellClass}>
                    <ActionButtons {...actions} row={row} />
                </td>
            </>
        );
    },
};
