import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getStatusLabel } from "@/utils/statusUtils";

export const McqTableConfig = {
    columns: [
        { label: "Question", key: "question", width: "w-[30%]" },
        { label: "Course", key: "course", width: "w-[15%]" },
        { label: "Question Type", key: "questionType", width: "w-[15%]", truncateLabel: true },
        { label: "Level", key: "level", width: "w-[15%]" },
        { label: "Important", key: "isImportant", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.question} label="Question" position="top" maxWidth="max-w-[220px]" />
            </td>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.courseName || "-"} label="Course" position="top" maxWidth="max-w-[150px]" />
            </td>
            <td className={bodyCellClass}>
                <span className="capitalize">{row?.questionType}</span>
            </td>
            <td className={bodyCellClass}>
                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${row?.level === 'easy' ? 'bg-green-100 text-green-800' :
                        row?.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                    {row?.level ? row.level.charAt(0).toUpperCase() + row.level.slice(1) : "-"}
                </span>
            </td>
            <td className={bodyCellClass}>
                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${row?.isImportant ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {row?.isImportant ? "Yes" : "No"}
                </span>
            </td>
            <td className={bodyCellClass}>
                <ActionButtons {...actions} row={row} />
            </td>
        </>
    ),
};
