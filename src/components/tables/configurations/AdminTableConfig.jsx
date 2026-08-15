import React from "react";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import { getStatusLabel } from "@/utils/statusUtils";
import { Send, RefreshCw } from "@/assets/icons";

export const AdminTableConfig = {
    columns: [
        { label: "Name", key: "name", width: "w-1/5" },
        { label: "Role", key: "role", width: "w-[15%]" },
        { label: "Email", key: "email", width: "w-1/5" },
        { label: "Gender", key: "gender", width: "w-[10%]" },
        { label: "Number", key: "mobileNumber", width: "w-[15%]" },
        { label: "Status", key: "adminStatus", width: "w-[10%]" },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => {
        const customActionsList = [];
        const isInvited = row?.status?.toLowerCase() === 'invited' || row?.adminStatus?.toLowerCase() === 'invited';

        if (isInvited && actions.handleResendInvite) {
            customActionsList.push({
                label: "Resend Invite",
                icon: Send,
                permission: actions.resendInvitePermission || "RESEND_ADMIN_INVITE",
                onClick: () => {
                    actions.handleResendInvite(row);
                }
            });
        }

        const isActive = row?.status?.toLowerCase() === 'active' || row?.adminStatus?.toLowerCase() === 'active';

        if (isActive && actions.handleClearSessions) {
            customActionsList.push({
                label: "Reset Session",
                icon: RefreshCw,
                permission: actions.clearSessionsPermission || "RESET_ADMIN_SESSION",
                onClick: () => {
                    actions.handleClearSessions(row);
                }
            });
        }

        return (
            <>
            {/* Name */}
            <td className={bodyCellClass}>
                <TableTooltip value={row?.name} label="Name" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar name={row?.name} />
                        <p className="truncate max-w-[120px] text-sm font-medium">{row?.name}</p>
                    </div>
                </TableTooltip>
            </td>

            {/* Role */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.role}
                    label="Role"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>

            {/* Email */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.email || row?.adminEmail}
                    label="Email"
                    position="top"
                    maxWidth="max-w-[150px]"
                    triggerClass="text-gray-500"
                />
            </td>

            {/* Gender */}
            <td className={bodyCellClass}>
                {row?.gender ? row.gender.charAt(0).toUpperCase() + row.gender.slice(1).toLowerCase() : ""}
            </td>

            {/* Mobile Number */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.mobileNumber}
                    label="Mobile Number"
                    position="top"
                    maxWidth="max-w-[110px]"
                />
            </td>

            {/* Status */}
            <td className={bodyCellClass}>
                <StatusChip
                    status={row?.adminStatus}
                    label={getStatusLabel(row?.adminStatus)}
                />
            </td>

            {/* Actions */}
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={row}
                    customActions={customActionsList}
                />
            </td>
        </>
    )},
};
