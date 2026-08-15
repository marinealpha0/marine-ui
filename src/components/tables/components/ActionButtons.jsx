import React from 'react';
import {
    VisibilityIcon,
    EditIcon,
    DeleteIcon,
    ReplyIcon,
} from '@/assets/icons';
import { MoreVertical, CheckCircle, XCircle, ClipboardCheck } from "@/assets/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermission } from "@/Hooks/usePermission";
import { UI_TEXT } from "@/constant";

const T = UI_TEXT.COMMON.TABLE_ACTIONS;

const ActionButtons = React.memo(({
    handleView,
    handleEdit,
    handleDelete,
    handleReply,
    handleReview,
    handleStatusChange,
    viewPermission,
    editPermission,
    deletePermission,
    replyPermission,
    reviewPermission,
    statusChangePermission,
    row,
    customActions = []
}) => {
    const { hasPermission } = usePermission();

    const canView = handleView && (!viewPermission || hasPermission(viewPermission));
    const canEdit = handleEdit && (!editPermission || hasPermission(editPermission));
    const canDelete = handleDelete && (!deletePermission || hasPermission(deletePermission));
    const canReply = handleReply && (!replyPermission || hasPermission(replyPermission));
    const canChangeStatus = handleStatusChange && 
        (!statusChangePermission || hasPermission(statusChangePermission)) && 
        row?.userStatus?.toLowerCase() !== 'invited' && 
        row?.adminStatus?.toLowerCase() !== 'invited' && 
        row?.status?.toLowerCase() !== 'invited';
    const canReview = handleReview && (!reviewPermission || hasPermission(reviewPermission)) && row?.status !== "Completed";

    // Check permissions for custom actions if they have a permission prop
    const availableCustomActions = customActions.filter(action =>
        !action.permission || hasPermission(action.permission)
    );

    const hasActions = canView || canEdit || canDelete || canReply || canChangeStatus || canReview || availableCustomActions.length > 0;

    if (!hasActions) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 p-0 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-max">
                {canView && (
                    <DropdownMenuItem onClick={() => handleView(row)} className="cursor-pointer gap-2 group focus:bg-primary focus:text-primary-foreground">
                        <VisibilityIcon className="h-4 w-4 text-slate-500 group-focus:text-white" />
                        <span>{T.VIEW}</span>
                    </DropdownMenuItem>
                )}
                {canEdit && (
                    <DropdownMenuItem onClick={() => handleEdit(row)} className="cursor-pointer gap-2 group focus:bg-primary focus:text-primary-foreground">
                        <EditIcon className="h-4 w-4 text-slate-500 group-focus:text-white" />
                        <span>{T.EDIT}</span>
                    </DropdownMenuItem>
                )}
                {canReply && (
                    <DropdownMenuItem onClick={() => handleReply(row)} className="cursor-pointer gap-2 group focus:bg-primary focus:text-primary-foreground">
                        <ReplyIcon className="h-4 w-4 text-slate-500 group-focus:text-white" />
                        <span>{T.REPLY}</span>
                    </DropdownMenuItem>
                )}
                {canReview && (
                    <DropdownMenuItem onClick={() => handleReview(row)} className="cursor-pointer gap-2 group focus:bg-primary focus:text-primary-foreground">
                        <ClipboardCheck className="h-4 w-4 text-slate-500 group-focus:text-white" />
                        <span>{T.REVIEW}</span>
                    </DropdownMenuItem>
                )}
                {availableCustomActions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={`cursor-pointer gap-2 group focus:text-white ${action.className || 'focus:bg-primary focus:text-primary-foreground'}`}
                    >
                        {action.icon && <action.icon className="h-4 w-4 group-focus:text-white" />}
                        <span>{action.label}</span>
                    </DropdownMenuItem>
                ))}
                {canChangeStatus && (
                    <DropdownMenuItem
                        onClick={() => handleStatusChange(row.id || row._id || row.adminId || row.userId, row.status)}
                        className={`cursor-pointer gap-2 group focus:text-white ${row.status?.toLowerCase() === 'active' ? 'text-red-600 focus:bg-red-500' : 'text-emerald-600 focus:bg-emerald-600'}`}
                    >
                        {row.status?.toLowerCase() === 'active' ? (
                            <XCircle className="h-4 w-4 group-focus:text-white" />
                        ) : (
                            <CheckCircle className="h-4 w-4 group-focus:text-white" />
                        )}
                        <span>{row.status?.toLowerCase() === 'active' ? T.MARK_INACTIVE : T.MARK_ACTIVE}</span>
                    </DropdownMenuItem>
                )}
                {canDelete && (
                    <DropdownMenuItem
                        onClick={() => handleDelete(row)}
                        className="cursor-pointer gap-2 text-red-600 group focus:bg-red-600 focus:text-white"
                    >
                        <DeleteIcon className="h-4 w-4 group-focus:text-white" />
                        <span>{T.DELETE}</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

export default ActionButtons;