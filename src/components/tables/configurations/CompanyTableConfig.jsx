import React from "react";
import CompanyAvatar from "@components/tables/components/CompanyAvatar";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";

export const CompanyTableConfig = {
    columns: [
        { label: "Company", key: "companyName", width: "w-1/5" },
        { label: "Industry", key: "industry", width: "w-[15%]" },
        { label: "Type", key: "companyType", width: "w-[15%]" },
        { label: "Jobs Posted", key: "totalJobsPosted", width: "w-[15%]" },
        { label: "Actions", key: "actions", width: "w-[15%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            <td className={bodyCellClass}>
                <TableTooltip value={row?.companyName} label="Company" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <CompanyAvatar name={row?.companyName} logo={row?.logo} />
                        <p className="truncate max-w-[120px] text-sm font-medium">{row?.companyName}</p>
                    </div>
                </TableTooltip>
            </td>
            <td className={`${bodyCellClass} text-medium`}>
                <TableTooltip
                    value={row?.industry}
                    label="Industry"
                    position="top"
                    maxWidth="max-w-[110px]"
                />
            </td>
            <td className={`${bodyCellClass} text-medium`}>{row?.companyType}</td>
            <td className={bodyCellClass}>{row?.totalJobsPosted}</td>
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={row}
                />
            </td>
        </>
    ),
};
