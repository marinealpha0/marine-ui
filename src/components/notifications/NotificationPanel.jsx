// NotificationPanel.jsx
import React, { useState, useRef, useEffect } from "react";
import {
    Bell, Briefcase, BookOpen, MessageSquare, Calendar, ChevronLeft, CheckCheck, Loader2,
    CreditCard, BusinessIcon, Users, CommentIcon, User, UserCog, Shield
} from "@/assets/icons";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/api";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/store";
import { formatNotificationTime, formatDisplayDateTime, formatDisplayTime, getTimelineDateLabel } from "@/utils/dateUtils";


const ICON_MAP = {
    Bell,
    Briefcase,
    BookOpen,
    MessageSquare,
    Calendar,
    CreditCard,
    BusinessIcon,
    Users,
    CommentIcon,
    User,
    UserCog,
    Shield
};

export const NotificationPanel = ({ trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const panelRef = useRef();
    const observerTarget = useRef(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const notifications = useNotificationStore((state) => state.notifications);
    const unreadCount = useNotificationStore((state) => state.unreadCount);
    const totalRecords = useNotificationStore((state) => state.totalRecords);

    const getProperDateTime = (timestamp) => {
        if (!timestamp) return "";
        const dateLabel = getTimelineDateLabel(timestamp);
        const timeLabel = formatDisplayTime(timestamp);
        if (dateLabel === "Today" || dateLabel === "Yesterday") {
            return `${dateLabel} at ${timeLabel}`;
        }
        return formatDisplayDateTime(timestamp);
    };

    const mergeNotifications = useNotificationStore((state) => state.mergeNotifications);
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

    const markAllMutation = useMutation({
        mutationFn: markAllNotificationsAsRead,
        meta: { skipToast: true },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin_notifications']);
            markAllAsRead();
        }
    });

    const markReadMutation = useMutation({
        mutationFn: markNotificationAsRead,
        meta: { skipToast: true },
        onMutate: async (notificationId) => {
            await queryClient.cancelQueries(['admin_notifications']);
            const previousNotifications = queryClient.getQueryData(['admin_notifications']);

            // Optimistically update Zustand store
            markAsRead(notificationId);

            queryClient.setQueryData(['admin_notifications'], (old) => {
                if (!old) return old;

                let notificationFound = false;

                const newPages = old.pages.map((page) => {
                    const newNotifications = page.data.notifications.map((note) => {
                        if (note._id === notificationId && !note.isRead) {
                            notificationFound = true;
                            return { ...note, isRead: true };
                        }
                        return note;
                    });

                    return {
                        ...page,
                        data: { ...page.data, notifications: newNotifications }
                    };
                });

                if (notificationFound && newPages.length > 0) {
                    const firstPage = newPages[0];
                    if (firstPage.data.unreadCount > 0) {
                        newPages[0] = {
                            ...firstPage,
                            data: {
                                ...firstPage.data,
                                unreadCount: firstPage.data.unreadCount - 1
                            }
                        };
                    }
                }

                return { ...old, pages: newPages };
            });

            return { previousNotifications };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousNotifications) {
                queryClient.setQueryData(['admin_notifications'], context.previousNotifications);
                queryClient.invalidateQueries(['admin_notifications']);
            }
        }
    });

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                // If clicking the bell icon itself, let the onClick handler toggle it
                if (!event.target.closest(".bell-trigger")) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent body scroll when notification panel is open (mobile only)
    useEffect(() => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
            document.body.style.overflow = isOpen ? "hidden" : "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ["admin_notifications"],
        meta: { skipGlobalError: true },
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getNotifications({ page: pageParam, limit: 10 });
            if (!response.status) {
                throw new Error(response.errorMsg || "Failed to fetch notifications");
            }
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const notifications = lastPage?.data?.notifications || [];
            if (notifications.length < 10) return undefined;
            return allPages.length + 1;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0, root: panelRef.current }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasNextPage, fetchNextPage, isOpen]);

    // Sync React Query data to Zustand store
    useEffect(() => {
        if (data) {
            const allFetched = data.pages.flatMap((page) => page?.data?.notifications || []);
            const backendUnreadCount = data.pages[0]?.data?.unreadCount;
            const backendTotalRecords = data.pages[0]?.data?.totalRecords;
            mergeNotifications(allFetched, backendUnreadCount, backendTotalRecords);
        }
    }, [data, mergeNotifications]);

    const allNotifications = notifications;
    const filteredNotifications = activeTab === "unread"
        ? allNotifications.filter((note) => !note.isRead)
        : allNotifications;

    const getIconDetails = (note) => {

        let IconComponent = Bell;
        if (note.icon && ICON_MAP[note.icon]) {
            IconComponent = ICON_MAP[note.icon];
        } else {
            // Legacy/fallback category logic in case note.icon is not populated
            switch (note.category) {
                case "courses": IconComponent = BookOpen; break;
                case "jobs": IconComponent = Briefcase; break;
                case "discussions": IconComponent = MessageSquare; break;
                case "admin": IconComponent = Bell; break;
                case "events": IconComponent = Calendar; break;
                default: IconComponent = Bell; break;
            }
        }

        // Use common style for all notification icons: a premium gradient box with brand coloring
        const color = "text-sky-600 dark:text-sky-400";
        const bg = "bg-gradient-to-b from-white to-sky-50/40 dark:from-slate-800 dark:to-sky-950/20";

        return { icon: IconComponent, color, bg };

    };

    const handleNotificationClick = (note) => {
        if (!note.isRead) {
            markReadMutation.mutate(note._id);
        }

        setIsOpen(false);

        // Dynamic route path navigation from Zustand/Config
        if (note.path) {
            navigate(note.path);
            return;
        }

        // Fallback to legacy navigation logic
        const { category, data } = note;
        if (!data) return;

        switch (category) {
            case 'discussions':
                const discussionId = data.discussionId || data.id || data._id;
                if (discussionId) {
                    navigate(`/discussions?discussionId=${discussionId}`);
                }
                break;
            case 'jobs':
                navigate(`/posts`);
                break;
            case 'courses':
                navigate(`/course-videos`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="relative inline-flex">
            {/* Trigger (your custom bell) */}
            <div className="relative inline-flex items-center bell-trigger cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {trigger}
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 grid size-4 min-w-[16px] px-1 place-items-center rounded-full bg-critical text-white text-[9px] font-bold ring-2 ring-background pointer-events-none">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                )}
            </div>

            {/* Notification Panel */}
            {isOpen && (
                <div
                    ref={panelRef}
                    className="
                        fixed inset-0 z-[100] w-full h-full bg-slate-50 flex flex-col 
                        md:absolute md:inset-auto md:top-full md:right-0 md:mt-2.5 md:w-[380px] md:h-auto md:max-h-[460px] 
                        md:bg-white md:rounded-t-lg md:rounded-b-2xl md:overflow-visible md:shadow-2xl md:border-2 md:border-slate-200 
                        dark:bg-gray-900 dark:md:border-gray-700 animate-in fade-in zoom-in-95 duration-200
                    "
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {/* Pointer caret arrow (Desktop only) */}
                    <div className="hidden md:block absolute -top-[9px] right-[12px] w-3.5 h-3.5 rotate-45 bg-white border-t-2 border-l-2 border-slate-200 dark:bg-gray-900 dark:border-gray-700 z-20" />

                    {/* Header */}
                    <div className="px-4 py-4 md:py-3.5 border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10 flex justify-between items-center shrink-0 rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                                Notifications
                            </h3>
                        </div>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                markAllMutation.mutate();
                            }}
                            disabled={markAllMutation.isPending || unreadCount === 0}
                            className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 active:scale-95"
                        >
                            <CheckCheck className="w-3.5 h-3.5" />
                            Mark all read
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-4 px-4 pt-2 border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab("all");
                            }}
                            className={`flex items-center gap-1.5 pb-2 text-xs font-bold border-b-2 transition-all duration-200 ${
                                activeTab === "all"
                                    ? "text-slate-900 dark:text-white border-slate-900 dark:border-white font-extrabold"
                                    : "text-slate-400 dark:text-gray-500 border-transparent hover:text-slate-600 dark:hover:text-gray-400"
                            }`}
                        >
                            <span>All</span>
                            {totalRecords > 0 && (
                                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
                                    activeTab === "all"
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                        : "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-400"
                                }`}>
                                    {totalRecords}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab("unread");
                            }}
                            className={`flex items-center gap-1.5 pb-2 text-xs font-bold border-b-2 transition-all duration-200 ${
                                activeTab === "unread"
                                    ? "text-slate-900 dark:text-white border-slate-900 dark:border-white font-extrabold"
                                    : "text-slate-400 dark:text-gray-500 border-transparent hover:text-slate-600 dark:hover:text-gray-400"
                            }`}
                        >
                            <span>Unread</span>
                            {unreadCount > 0 && (
                                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
                                    activeTab === "unread"
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                        : "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-400"
                                }`}>
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-0 scrollbar-hide">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                            </div>
                        ) : isError && filteredNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                                <p className="text-sm text-red-500 mb-2 font-medium">Failed to load notifications</p>
                                <button
                                    onClick={() => fetchNextPage({ pageParam: 1 })}
                                    className="text-xs text-sky-600 hover:underline font-bold"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 dark:text-gray-500 px-6">
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-gray-800 text-slate-400 dark:text-gray-500 flex items-center justify-center mb-3 shadow-sm ring-4 ring-slate-100 dark:ring-gray-800/50">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                                    {activeTab === "unread" ? "No unread notifications" : "No notifications"}
                                </h4>
                                <p className="text-[11px] text-slate-400 dark:text-gray-400">
                                    {activeTab === "unread" ? "You're all caught up!" : "We will notify you when something updates."}
                                </p>
                            </div>
                        ) : (
                            <ul className="flex flex-col">
                                {filteredNotifications.map((note, index) => {
                                    const { icon: Icon, color, bg } = getIconDetails(note);
                                    return (
                                        <React.Fragment key={note._id}>
                                            <li
                                                className={`
                                                    relative flex gap-3 p-3.5 cursor-pointer transition-all duration-200
                                                    ${!note.isRead
                                                        ? 'bg-secondary/[0.03] dark:bg-secondary/[0.05] hover:bg-secondary/[0.10] dark:hover:bg-secondary/[0.10]'
                                                        : 'bg-transparent hover:bg-slate-50 dark:hover:bg-gray-800/40'
                                                    }
                                                `}
                                                onClick={() => handleNotificationClick(note)}
                                            >
                                                {/* Icon with rounded square container, proper border, and unread dot overlay */}
                                                <div className="relative shrink-0 select-none">
                                                    <div className={`w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-gray-800 ${bg} flex items-center justify-center shadow-sm`}>
                                                        <Icon className={`w-5 h-5 ${color}`} />
                                                    </div>
                                                    {!note.isRead && (
                                                        <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-white dark:ring-gray-900" />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                                                        <p className={`text-xs ${!note.isRead ? 'font-bold text-slate-800 dark:text-slate-100' : 'font-semibold text-slate-600 dark:text-slate-400'} leading-snug line-clamp-1`}>
                                                            {note.title}
                                                        </p>
                                                        <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium whitespace-nowrap">
                                                            {getProperDateTime(note.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${!note.isRead ? 'text-slate-700 font-medium dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'}`}>
                                                        {note.message}
                                                    </p>
                                                </div>
                                            </li>
                                            {index < filteredNotifications.length - 1 && (
                                                <div className="mx-4 border-b border-slate-200 dark:border-gray-700" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}

                                {/* Sentinel for Infinite Scroll */}
                                <div ref={observerTarget} className="h-4 flex justify-center items-center">
                                    {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                                </div>
                            </ul>
                        )}

                        {/* Mobile Bottom Spacer for reachability */}
                        <div className="h-6 md:hidden"></div>
                    </div>
                </div>
            )}
        </div>
    );
};
