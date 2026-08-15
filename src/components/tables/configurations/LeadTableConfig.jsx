import React from "react";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { MessageSquare } from "lucide-react";
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from "@/utils/leadUtils";

export const LeadTableConfig = {
  columns: [
    { label: "Lead Number", key: "leadId", width: "w-[12%]" },
    { label: "Student Name", key: "studentName", width: "w-[18%]" },
    { label: "Contact Info", key: "email", width: "w-[22%]" },
    { label: "Priority Status", key: "priorityStatus", width: "w-[15%]" },
    { label: "Source", key: "source", width: "w-[13%]" },
    { label: "Status", key: "status", width: "w-[12%]" },
    { label: "Actions", key: "actions", width: "w-[8%]", sortable: false },
  ],
  renderRow: (row, bodyCellClass, actions) => {
    return (
      <>
        {/* Lead ID */}
        <td className={`${bodyCellClass} font-semibold text-slate-800`}>
          {row?.leadNumber || "-"}
        </td>

        {/* Student Name */}
        <td className={bodyCellClass}>
          <TableTooltip value={row?.leadName} label="Student Name" position="top">
            <p className="truncate max-w-[140px] text-sm font-semibold text-slate-900">
              {row?.leadName}
            </p>
          </TableTooltip>
        </td>

        {/* Contact Info (Email, Phone & Alt Phone) */}
        <td className={`${bodyCellClass} text-xs`}>
          <div className="flex flex-col gap-0.5 justify-center min-w-0">
            <span className="truncate max-w-[180px] text-gray-500 font-medium">
              {row?.emailAddress}
            </span>
            <span className="text-gray-400 font-semibold">
              {row?.phoneNumber}{row?.alternateMobile ? ` / ${row.alternateMobile}` : ""}
            </span>
          </div>
        </td>

        {/* Priority Status */}
        <td className={bodyCellClass}>
          <StatusChip status={row?.priorityStatus} label={row?.priorityStatus || "-"} />
        </td>

        {/* Source */}
        <td className={`${bodyCellClass} font-medium text-slate-500`}>
          {LEAD_SOURCE_LABELS[row?.leadSource] || row?.leadSource || "-"}
        </td>

        {/* Status */}
        <td className={bodyCellClass}>
          <StatusChip status={row?.status} label={LEAD_STATUS_LABELS[row?.status] || row?.status} />
        </td>

        {/* Actions */}
        <td className={bodyCellClass}>
          <ActionButtons
            {...actions}
            handleStatusChange={null}
            row={row}
            customActions={[
              {
                label: "Add Note",
                icon: MessageSquare,
                permission: actions.notesPermission,
                onClick: () => {
                  if (actions.handleAddNote) {
                    actions.handleAddNote(row);
                  }
                },
              }
            ]}
          />
        </td>
      </>
    );
  },
};
