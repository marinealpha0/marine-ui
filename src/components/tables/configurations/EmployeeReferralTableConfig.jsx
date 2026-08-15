import React from "react";
import ActionButtons from "../components/ActionButtons";
import Avatar from "../components/Avatar";
import StatusChip from "../components/StatusChip";
import TableTooltip from "../components/TableTooltip";

export const EmployeeReferralTableConfig = {
  columns: [
    { key: "employee", label: "Employee Details", sortable: true, width: "w-[32%]", truncateLabel: true },
    { key: "invited", label: "Invited", sortable: true, width: "w-[13%]" },
    { key: "created", label: "Registered", sortable: true, width: "w-[13%]" },
    { key: "subscribed", label: "Subscribed", sortable: true, width: "w-[13%]" },
    { key: "income", label: "Income", sortable: true, width: "w-[15%]" },
    { key: "status", label: "Status", sortable: true, width: "w-[15%]" },
    { key: "actions", label: "Actions", sortable: false, width: "w-[10%]" },
  ],

  renderRow: (row, cellClass, actions) => {
    return (
      <React.Fragment key={row._id}>
        <td className={cellClass}>
          <TableTooltip value={row.employeeName} label="Employee" position="top">
            <div className="flex items-center gap-3 min-w-0">
              {row.profilePic ? (
                <img src={row.profilePic} alt={row.employeeName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <Avatar name={row.employeeName} size="md" />
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-900 truncate max-w-[130px]">{row.employeeName}</span>
                <span className="text-xs text-gray-500 truncate max-w-[130px]">{row.employeeEmail}</span>
              </div>
            </div>
          </TableTooltip>
        </td>
        <td className={cellClass}>
          <span className="font-medium text-gray-700">{row.totalInvited || 0}</span>
        </td>
        <td className={cellClass}>
          <span className="font-medium text-gray-700">{row.totalRegistered || 0}</span>
        </td>
        <td className={cellClass}>
          <span className="font-medium text-gray-700">{row.totalSubscribed || 0}</span>
        </td>
        <td className={cellClass}>
          <TableTooltip value={`₹${(row.incomeGenerated || 0).toLocaleString()}`} label="Income Generated" position="top" maxWidth="max-w-[110px]">
            <span className="font-bold text-green-600">₹{(row.incomeGenerated || 0).toLocaleString()}</span>
          </TableTooltip>
        </td>
        <td className={cellClass}>
          <StatusChip status={row.status} />
        </td>
        <td className={cellClass}>
          <ActionButtons
            handleView={() => actions.handleView?.(row)}
            handleStatusChange={() => actions.handleStatusChange?.(row, row.status === 'active' ? 'inactive' : 'active')}
            viewPermission={actions.viewPermission}
            statusChangePermission={actions.statusChangePermission}
            row={row}
          />
        </td>
      </React.Fragment>
    );
  },
};
