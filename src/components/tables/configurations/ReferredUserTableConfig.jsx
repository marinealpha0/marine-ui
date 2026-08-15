import React from "react";
import Avatar from "../components/Avatar";
import StatusChip from "../components/StatusChip";

export const ReferredUserTableConfig = {
  columns: [
    { key: "user", label: "User Details", sortable: true, width: "w-[35%]" },
    { key: "date", label: "Date", sortable: true, width: "w-[20%]" },
    { key: "income", label: "Income Generated", sortable: true, width: "w-[25%]" },
    { key: "status", label: "Status", sortable: true, width: "w-[20%]" },
  ],

  renderRow: (row, cellClass) => {
    return (
      <React.Fragment key={row._id}>
        <td className={cellClass}>
          <div className="flex items-center gap-3">
            {row.profilePic ? (
              <img src={row.profilePic} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <Avatar name={row.name} size="md" />
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{row.name}</span>
              <span className="text-xs text-gray-500">{row.email}</span>
            </div>
          </div>
        </td>
        <td className={cellClass}>
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{row.date}</span>
            <span className="text-xs text-gray-500">
              {row.status?.toLowerCase() === 'invited' ? 'Invited on' : 
               row.status?.toLowerCase() === 'subscribed' ? 'Subscribed on' : 'Registered on'}
            </span>
          </div>
        </td>
        <td className={cellClass}>
          <span className="font-bold text-green-600">₹{(row.income || 0).toLocaleString()}</span>
        </td>
        <td className={cellClass}>
           <StatusChip status={row.status} />
        </td>
      </React.Fragment>
    );
  },
};
