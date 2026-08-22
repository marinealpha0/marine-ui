import React from "react";
import ActionButtons from "../components/ActionButtons";
import TableTooltip from "../components/TableTooltip";
import { StatusChip } from "@/components/app/kit";

export const DrillsTableConfig = {
  columns: [
    { label: "REF", key: "ref", width: "w-[12%]" },
    { label: "DRILL TYPE", key: "drillType", width: "w-[20%]" },
    { label: "VESSEL", key: "vessel", width: "w-[22%]" },
    { label: "SCHEDULED", key: "scheduledDate", width: "w-[15%]" },
    { label: "PARTICIPANTS", key: "participants", width: "w-[14%]" },
    { label: "STATUS", key: "status", width: "w-[17%]" },
  ],
  renderRow: (row, bodyCellClass, actions) => (
    <>
      <td className={`${bodyCellClass} font-bold text-slate-900`}>
        <button
          onClick={() => actions.handleView?.(row)}
          className="font-bold text-slate-900 hover:text-primary transition-colors text-left focus:outline-none"
        >
          {row.ref}
        </button>
      </td>
      <td className={bodyCellClass}>
        <TableTooltip value={row.drillType} label="Drill Type" position="top">
          <span className="font-medium text-slate-800">{row.drillType}</span>
        </TableTooltip>
      </td>
      <td className={bodyCellClass}>
        <span className="text-slate-700 font-medium">{row.vessel}</span>
      </td>
      <td className={bodyCellClass}>
        <span className="text-slate-600 font-mono text-xs">{row.scheduledDate}</span>
      </td>
      <td className={bodyCellClass}>
        <span className="text-slate-700 font-semibold">{row.participants}</span>
      </td>
      <td className={bodyCellClass}>
        <StatusChip status={row.status} />
      </td>
    </>
  ),
};
