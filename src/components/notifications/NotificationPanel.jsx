// NotificationPanel.jsx - Classic & Clean Side Sheet Drawer
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, Check, X, CheckCheck, Wrench, ShoppingCart, ShieldAlert, ShieldCheck,
  Calendar, Ship, ArrowRight, CheckCircle2, XCircle
} from "lucide-react";
import { toast } from "sonner";
import { useNotificationStore } from "@/store";
import { formatDisplayDateTime, formatDisplayTime, getTimelineDateLabel } from "@/utils/dateUtils";

export const NotificationPanel = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "approvals" | "unread"
  const panelRef = useRef(null);
  const navigate = useNavigate();

  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const approveNotification = useNotificationStore((state) => state.approveNotification);
  const declineNotification = useNotificationStore((state) => state.declineNotification);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const deleteNotification = useNotificationStore((state) => state.deleteNotification);

  const pendingActionCount = notifications.filter(
    (n) => n.requiresAction && n.actionStatus === "pending"
  ).length;

  const totalCount = notifications.length;

  const getProperDateTime = (timestamp) => {
    if (!timestamp) return "";
    const dateLabel = getTimelineDateLabel(timestamp);
    const timeLabel = formatDisplayTime(timestamp);
    if (dateLabel === "Today" || dateLabel === "Yesterday") {
      return `${dateLabel} ${timeLabel}`;
    }
    return formatDisplayDateTime(timestamp);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredNotifications = notifications.filter((note) => {
    if (activeTab === "unread" && note.isRead) return false;
    if (activeTab === "approvals" && (!note.requiresAction || note.actionStatus !== "pending")) {
      return false;
    }
    return true;
  });

  const handleApprove = (e, note) => {
    e.stopPropagation();
    approveNotification(note._id);
    toast.success(`Approved: ${note.title}`);
  };

  const handleDecline = (e, note) => {
    e.stopPropagation();
    declineNotification(note._id);
    toast.error(`Declined: ${note.title}`);
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  const handleCardClick = (note) => {
    if (!note.isRead) {
      markAsRead(note._id);
    }
    if (note.path) {
      setIsOpen(false);
      navigate(note.path);
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case "critical":
        return <span className="size-2 rounded-full bg-critical shrink-0" title="Critical" />;
      case "high":
        return <span className="size-2 rounded-full bg-warning shrink-0" title="High Priority" />;
      case "medium":
        return <span className="size-2 rounded-full bg-ocean shrink-0" title="Medium Priority" />;
      default:
        return <span className="size-2 rounded-full bg-muted-foreground/50 shrink-0" title="Normal" />;
    }
  };

  const getIcon = (actionType) => {
    switch (actionType) {
      case "Work Order":
        return <Wrench className="size-4 text-ocean" />;
      case "Procurement":
        return <ShoppingCart className="size-4 text-ocean" />;
      case "Vessel Deviation":
        return <ShieldAlert className="size-4 text-critical" />;
      case "Permit To Work":
        return <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />;
      case "Compliance":
        return <Calendar className="size-4 text-ocean" />;
      default:
        return <Bell className="size-4 text-ocean" />;
    }
  };

  return (
    <div className="relative inline-flex">
      {/* Trigger Bell */}
      <div
        className="relative inline-flex items-center bell-trigger cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {trigger}
        {(unreadCount > 0 || pendingActionCount > 0) && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-critical text-white text-[9px] font-bold ring-2 ring-background pointer-events-none">
            {pendingActionCount > 0 ? `${pendingActionCount}` : unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* Classic Slide-over Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Subtle Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Sheet Drawer */}
          <div
            ref={panelRef}
            className="relative z-50 flex h-full w-full sm:w-[440px] flex-col bg-surface text-foreground shadow-xl border-l border-border animate-in slide-in-from-right duration-250 select-none"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border bg-surface sticky top-0 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-ocean/10 text-ocean text-xs font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMarkAllRead}
                  disabled={unreadCount === 0}
                  className="text-xs font-medium text-ocean hover:underline disabled:opacity-40 disabled:no-underline transition-colors flex items-center gap-1"
                >
                  <CheckCheck className="size-3.5" />
                  Mark all read
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Segmented Tabs */}
            <div className="px-5 py-2.5 border-b border-border bg-background/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    activeTab === "all"
                      ? "bg-surface text-foreground font-semibold shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({totalCount})
                </button>

                <button
                  onClick={() => setActiveTab("approvals")}
                  className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "approvals"
                      ? "bg-surface text-foreground font-semibold shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>Approvals</span>
                  {pendingActionCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-critical text-white text-[10px] font-bold">
                      {pendingActionCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("unread")}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    activeTab === "unread"
                      ? "bg-surface text-foreground font-semibold shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>
            </div>

            {/* Notification Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/60 scrollbar-hide">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-3">
                    <Bell className="size-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {activeTab === "approvals"
                      ? "No pending approvals"
                      : activeTab === "unread"
                      ? "No unread notifications"
                      : "No notifications"}
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    You're all caught up! New requests and alerts will appear here.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((note) => {
                  const isPending = note.requiresAction && note.actionStatus === "pending";
                  const isApproved = note.actionStatus === "approved";
                  const isDeclined = note.actionStatus === "declined";

                  return (
                    <div
                      key={note._id}
                      onClick={() => handleCardClick(note)}
                      className={`group relative p-4 hover:bg-secondary/40 transition-colors flex items-start gap-3.5 cursor-pointer ${
                        !note.isRead ? "bg-ocean/[0.02]" : ""
                      }`}
                    >
                      {/* Unread Left Dot */}
                      {!note.isRead && (
                        <span className="absolute left-1.5 top-5 size-1.5 rounded-full bg-ocean" />
                      )}

                      {/* Icon Avatar */}
                      <div className="size-9 rounded-full bg-secondary border border-border/60 flex items-center justify-center shrink-0 mt-0.5">
                        {getIcon(note.actionType)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header Row */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {getPriorityDot(note.priority)}
                            <h4
                              className={`text-xs ${
                                !note.isRead ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                              } truncate`}
                            >
                              {note.title}
                            </h4>
                          </div>

                          <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                            {getProperDateTime(note.createdAt)}
                          </span>
                        </div>

                        {/* Metadata Tag Row */}
                        <div className="flex items-center gap-2 mb-1.5 text-[11px] text-muted-foreground">
                          {note.vessel && (
                            <span className="flex items-center gap-1">
                              <Ship className="size-3 text-ocean" />
                              {note.vessel}
                            </span>
                          )}
                          {note.vessel && note.actionType && <span>•</span>}
                          {note.actionType && <span>{note.actionType}</span>}
                        </div>

                        {/* Description Text */}
                        <p className="text-xs text-muted-foreground leading-normal mb-2">
                          {note.message}
                        </p>

                        {/* Action Buttons or Status */}
                        {note.requiresAction && (
                          <div className="pt-2 flex items-center justify-between gap-2">
                            {isPending ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handleApprove(e, note)}
                                  className="px-3.5 py-1 rounded-md bg-ocean hover:bg-ocean/90 text-white text-xs font-medium transition-colors shadow-xs"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={(e) => handleDecline(e, note)}
                                  className="px-3.5 py-1 rounded-md border border-border hover:bg-critical/10 text-critical text-xs font-medium transition-colors"
                                >
                                  Decline
                                </button>
                              </div>
                            ) : isApproved ? (
                              <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                                <CheckCircle2 className="size-3.5" />
                                Approved
                              </div>
                            ) : isDeclined ? (
                              <div className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/20">
                                <XCircle className="size-3.5" />
                                Declined
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


