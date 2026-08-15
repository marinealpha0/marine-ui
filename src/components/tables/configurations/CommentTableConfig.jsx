import React from "react";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";
import StatusChip from "@components/tables/components/StatusChip";
import ActionButtons from "@components/tables/components/ActionButtons";
import TableTooltip from "@components/tables/components/TableTooltip";
import {
    CommentIcon,
    InfoIcon,
    ArticleIcon,
    PhoneAndroidIcon,
    CheckCircleIcon as CheckCircle,
} from "@/assets/icons";
import { getStatusLabel } from "@/utils/statusUtils";
import { formatDisplayDateTime } from "@/utils/dateUtils";

export const CommentTableConfig = {
    columns: [
        { label: "Name", key: "fullName", width: "w-1/5" },
        { label: "Email", key: "userEmail", width: "w-1/5" },
        { label: "Query Type", key: "queryType", width: "w-1/5" },
        { label: "Subject", key: "subject", width: "w-1/5" },
        { label: "Created At", key: "createdAt", width: "w-[15%]", truncateLabel: true },
        { label: "Actions", key: "actions", width: "w-[10%]", sortable: false },
    ],
    renderRow: (row, bodyCellClass, actions) => (
        <>
            {/* Name */}
            <td className={bodyCellClass}>
                <TableTooltip value={row?.fullName} label="Name" position="top">
                    <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar name={row?.fullName} />
                        <p className="truncate max-w-[120px] text-sm font-medium">{row?.fullName}</p>
                    </div>
                </TableTooltip>
            </td>

            {/* Email */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.userEmail}
                    label="Email"
                    position="top"
                    maxWidth="max-w-[150px]"
                    triggerClass="text-gray-500"
                />
            </td>

            {/* Query Type */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.queryType}
                    label="Query Type"
                    position="top"
                    maxWidth="max-w-[120px]"
                />
            </td>

            {/* Subject */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={row?.subject}
                    label="Subject"
                    position="top"
                    maxWidth="max-w-[130px]"
                />
            </td>

            {/* Created At */}
            <td className={bodyCellClass}>
                <TableTooltip
                    value={formatDisplayDateTime(row?.createdAt)}
                    label="Created At"
                    position="top"
                    maxWidth="max-w-[110px]"
                />
            </td>

            {/* Actions */}
            <td className={bodyCellClass}>
                <ActionButtons
                    {...actions}
                    row={row}
                />
            </td>
        </>
    ),

    CollapsibleContent: ({ row }) => (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 order-2">
                    <h6 className="font-semibold text-primary flex items-center gap-2 mb-3">
                        <CommentIcon style={{ fontSize: "1.25rem" }} />
                        Message
                    </h6>
                    <p className="text-muted-foreground bg-white p-3 rounded-md border border-border h-[87%]">
                        {row?.message}
                    </p>
                </div>
                <div className="order-1">
                    <h6 className="font-semibold text-primary flex items-center gap-2 mb-3">
                        <InfoIcon style={{ fontSize: "1.25rem" }} />
                        Details
                    </h6>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-border">
                            <ArticleIcon className="text-gray-500" />
                            <div>
                                <p className="font-semibold text-sm">Query Number</p>
                                <p className="text-muted-foreground text-sm">
                                    {row?.queryNumber}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-border">
                            <ArticleIcon className="text-gray-500" />
                            <div>
                                <p className="font-semibold text-sm">Subject</p>
                                <p className="text-muted-foreground text-sm">{row?.subject}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-border">
                            <PhoneAndroidIcon className="text-gray-500" />
                            <div>
                                <p className="font-semibold text-sm">Phone</p>
                                <p className="text-muted-foreground text-sm">
                                    {row?.mobileNumber}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-border">
                            <CheckCircle className="text-gray-500" />
                            <div>
                                <p className="font-semibold text-sm">Status</p>
                                <StatusChip
                                    status={row?.status}
                                    label={getStatusLabel(row?.status)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
