import React from "react";
import { Avatar as UserAvatar } from "@components/tables/TableUtils";
import TransactionTypeChip from "@components/tables/components/TransactionTypeChip";
import StatusChip from "@components/tables/components/StatusChip";
import TableTooltip from "@components/tables/components/TableTooltip";
import { HistoryIcon as History, User, Mail, Smartphone, Calendar, LocalOfferIcon } from "@/assets/icons";
import { getStatusLabel } from "@/utils/statusUtils";

export const TransactionTableConfig = {
    columns: [
        { label: "Name", key: "name", width: "w-[22%]" },
        { label: "Plan", key: "plan", width: "w-[13%]" },
        { label: "Transaction ID", key: "transactionId", width: "w-[22%]", truncateLabel: true },
        { label: "Transaction Type", key: "transactionType", width: "w-[13%]", truncateLabel: true },
        { label: "Status", key: "status", width: "w-[10%]" },
    ],
    renderRow: (row, bodyCellClass, actions) => {
        const fullName = row?.user ? `${row.user.firstName || ""} ${row.user.lastName || ""}`.trim() : "";
        const planName = row?.membership?.membershipName || "-";

        return (
            <>
                <td className={bodyCellClass}>
                    <TableTooltip value={fullName} label="Name" position="top">
                        <div className="flex items-center gap-3 min-w-0">
                            <UserAvatar name={fullName} />
                            <p className="truncate text-sm font-medium">{fullName || "-"}</p>
                        </div>
                    </TableTooltip>
                </td>
                <td className={`${bodyCellClass} text-medium`}>
                    <TableTooltip value={planName} label="Plan" position="top" maxWidth="max-w-[110px]" />
                </td>
                <td className={`${bodyCellClass} text-medium text-primary`}>
                    <TableTooltip value={row?.transactionId} label="Transaction ID" position="top" maxWidth="max-w-[180px]" triggerClass="text-primary" />
                </td>
                <td className={bodyCellClass}>
                    <TransactionTypeChip transactionType={row?.transactionType} />
                </td>
                <td className={bodyCellClass}>
                    <StatusChip status={row?.status} label={getStatusLabel(row?.status)} />
                </td>
            </>
        );
    },
    CollapsibleContent: ({ row }) => {
        const getCurrencySymbol = (currency) => {
            switch (currency?.toUpperCase()) {
                case "USD": return "$";
                case "EUR": return "€";
                case "GBP": return "£";
                case "INR":
                default: return "₹";
            }
        };

        const symbol = getCurrencySymbol(row?.currency);
        const email = row?.user?.userEmail || "-";
        const mobileNumber = row?.user?.mobileNumber || "-";
        const fullName = row?.user ? `${row.user.firstName || ""} ${row.user.lastName || ""}`.trim() : "-";

        const formattedDateTime = row?.createdAt
            ? new Date(row.createdAt * 1000).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
            })
            : "-";

        const actualPrice = row?.membership?.actualPrice;
        const offerPrice = row?.membership?.offerPrice;
        const duration = row?.membership?.duration;
        const couponCode = row?.coupon?.couponCode;
        const couponDiscount = row?.couponDiscount || 0;

        return (
            <div className="bg-white rounded-xl border border-slate-200/80 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column: Customer & Billing Details (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Customer & Billing Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="flex items-center gap-3 text-slate-600 p-2.5 rounded-xl border border-slate-50 bg-slate-50/30">
                                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-150 text-slate-400 flex items-center justify-center shadow-sm">
                                        <User className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Customer Name</p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{fullName}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-3 text-slate-600 p-2.5 rounded-xl border border-slate-50 bg-slate-50/30">
                                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-150 text-slate-400 flex items-center justify-center shadow-sm">
                                        <Mail className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
                                        <p className="text-sm font-semibold text-slate-700 truncate" title={email}>{email}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3 text-slate-600 p-2.5 rounded-xl border border-slate-50 bg-slate-50/30">
                                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-150 text-slate-400 flex items-center justify-center shadow-sm">
                                        <Smartphone className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Phone Number</p>
                                        <p className="text-sm font-semibold text-slate-700">{mobileNumber}</p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-3 text-slate-600 p-2.5 rounded-xl border border-slate-50 bg-slate-50/30">
                                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-150 text-slate-400 flex items-center justify-center shadow-sm">
                                        <Calendar className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Purchase Date</p>
                                        <p className="text-sm font-semibold text-slate-700">{formattedDateTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Metadata block */}
                        <div className="border-t border-slate-100 pt-5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Payment Reference</h3>
                            <div className="flex flex-wrap items-center gap-4 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                <div className="flex-grow min-w-[200px]">
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Reference Transaction ID</p>
                                    <p className="text-xs font-mono font-bold text-primary mt-1 select-all">{row?.transactionId || "-"}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Payment Engine:</span>
                                    <span className="text-xs font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 shadow-sm capitalize">
                                        {row?.pgProvider || "manual"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Invoice & Breakdown (5 cols) */}
                    <div className="lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Order Invoice</h3>
                            
                            {/* Plan overview card */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Selected Plan</p>
                                    <h4 className="text-base font-bold text-slate-800 mt-0.5">{row?.membership?.membershipName || "-"}</h4>
                                </div>
                                {duration && (
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
                                        {duration} Months
                                    </span>
                                )}
                            </div>

                            {/* Billing breakdown items */}
                            <div className="space-y-3.5 text-xs text-slate-600 px-1">
                                {actualPrice && actualPrice !== offerPrice && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-medium">Standard Retail Price</span>
                                        <span className="text-slate-400 line-through">
                                            {symbol}{actualPrice.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">Plan Subtotal (Offer Price)</span>
                                    <span className="font-semibold text-slate-800">
                                        {offerPrice ? `${symbol}${offerPrice.toLocaleString()}` : "-"}
                                    </span>
                                </div>

                                {couponCode && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 font-medium flex items-center gap-2">
                                            Promo Discount
                                            <span className="font-mono font-bold text-primary bg-primary/10 border border-dashed border-primary/30 px-2 py-0.5 rounded text-[9px]">
                                                {couponCode}
                                            </span>
                                        </span>
                                        <span className="font-semibold text-emerald-600">
                                            -{symbol}{couponDiscount.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                <div className="border-t border-slate-100 my-4"></div>

                                <div className="flex justify-between items-center bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                                    <div>
                                        <span className="text-slate-700 font-extrabold block text-sm">Total Paid</span>
                                        <span className="text-[9px] text-slate-400 font-medium mt-0.5 block">Invoice settled successfully</span>
                                    </div>
                                    <span className="text-xl font-extrabold text-emerald-600 tracking-tight">
                                        {symbol}{(row?.amount || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
