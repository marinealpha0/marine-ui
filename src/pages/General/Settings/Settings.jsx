import React from "react";
import { useSearchParams } from "react-router-dom";
import HeaderSection from "@/layouts/HeaderSection";
import { UI_TEXT } from "@/constant";
import AccountTab from "./components/AccountTab";
import ReferralsTab from "./components/ReferralsTab";
import ActivityTab from "./components/ActivityTab";
import NotificationsTab from "./components/NotificationsTab";
import { AccountCircleIcon as AccountCircle, GroupIcon, HistoryIcon as History, NotificationsIcon } from "@/assets/icons";
import { useAuthStore } from "@/store";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const isSystemUser = user?.isSystemUser;

  const rawActiveTab = searchParams.get("tab") || "account";
  const activeTab = (rawActiveTab === "referrals" && !isSystemUser) ? "account" : rawActiveTab;

  const tabs = [
    { label: "Account", icon: <AccountCircle />, value: "account" },
    isSystemUser && { label: "Referrals", icon: <GroupIcon />, value: "referrals" },
    { label: "Notifications", icon: <NotificationsIcon />, value: "notifications" },
    { label: "Activity", icon: <History />, value: "activity" },
  ].filter(Boolean);

  return (
    <div className="min-h-screen transition-all">
      <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <HeaderSection
          title={UI_TEXT.SETTINGS.TITLE}
          subtitle={UI_TEXT.SETTINGS.SUBTITLE}
        />

        {/* Tabs Router Switcher */}
        <div className="mb-4">
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <div className="flex min-w-max">
                {tabs.map((tab) => {
                  const selected = activeTab === tab.value;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setSearchParams({ tab: tab.value })}
                      className={`flex items-center gap-2 px-5 py-4 text-sm transition-colors ${
                        selected
                          ? "text-primary border-b-2 border-primary font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`${
                          selected ? "text-primary" : "text-slate-500"
                        }`}
                      >
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Rendering */}
        {activeTab === "account" && <AccountTab />}
        {activeTab === "referrals" && isSystemUser && <ReferralsTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "activity" && <ActivityTab />}
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Hide HTML5 number input spinners */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Settings;
