import React from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ tabs, activeTab, onTabChange, className }) => {
    return (
        <div
            className={cn(
                "flex p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 w-fit shadow-inner mb-6",
                className
            )}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ease-out",
                            isActive
                                ? "bg-white dark:bg-gray-950 text-primary dark:text-primary-light shadow-md ring-1 ring-black/5 dark:ring-white/10 transform scale-105"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                        )}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
