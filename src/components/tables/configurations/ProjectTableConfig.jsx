import React from "react";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";

export const ProjectTableConfig = {
    columns: [
        { label: "Title", key: "title", width: "w-[25%]" },
        { label: "Level", key: "difficulty", width: "w-[15%]" },
        { label: "Time", key: "estimatedTime", width: "w-[15%]" },
        { label: "Courses", key: "courses", width: "w-[25%]" },
        { label: "Actions", key: "actions", width: "w-[20%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => {
        const getCourseName = (c) => c?.name || c?.courseName || c?.title || c;
        const courses = row?.courses || [];
        const allCourseNames = courses.map(getCourseName).join(", ");
        const displayCourses = courses.slice(0, 3).map(getCourseName).join(", ");
        const remainingCount = courses.length > 3 ? courses.length - 3 : 0;

        return (
            <>
                <td className={`${bodyCellClass} font-medium`}>
                    <TableTooltip value={row?.title} label="Title" position="top" maxWidth="max-w-[170px]" />
                </td>
                <td className={bodyCellClass}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row?.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        row?.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {row?.difficulty}
                    </span>
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={row?.estimatedTime} label="Time" position="top" maxWidth="max-w-[100px]" />
                </td>
                <td className={bodyCellClass}>
                    <TableTooltip value={allCourseNames} label="Courses" position="top" maxWidth="max-w-[180px]">
                        <div className="truncate max-w-[180px] cursor-pointer text-sm">
                            {displayCourses}
                            {remainingCount > 0 && <span className="text-gray-500 font-medium ml-1">+{remainingCount}</span>}
                        </div>
                    </TableTooltip>
                </td>
                <td className={bodyCellClass}>
                    <ActionButtons {...actions} row={row} />
                </td>
            </>
        );
    },
};
