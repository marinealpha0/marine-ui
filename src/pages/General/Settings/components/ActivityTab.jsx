import React from "react";
import { Badge } from "@/components/ui/badge";
import { HistoryIcon as History, CheckCircleIcon as CheckCircle, CancelIcon as Cancel } from "@/assets/icons";
import Card from "./Card";
import CardHeader from "./CardHeader";
import { useGetAppSettings } from "../hooks/useSettingServices";
import { formatDisplayDateTime } from "@/utils/dateUtils";

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const getDeviceDetails = (deviceStr) => {
  if (!deviceStr) return { browser: "—", device: "—" };
  const parts = deviceStr.split(/\s*\/\s*/);
  if (parts.length >= 2) {
    return {
      device: parts[0],
      browser: parts[1],
    };
  }
  return {
    browser: deviceStr,
    device: "—",
  };
};

const ActivityTab = () => {
  const { data, isLoading } = useGetAppSettings("admin-activity");

  // API is expected to return an array of activity records
  const loginHistory = Array.isArray(data) ? data : (data?.activities ?? []);




  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader
            iconBgClass="bg-red-600"
            icon={<History />}
            title="Login Activity"
            subheader="Recent login activity and security events for your admin account"
          />
          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      IP Address
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Browser / Device
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((row, idx) => {
                    const { browser, device } = getDeviceDetails(row.device);
                    const isSuccess = row.status?.toLowerCase() === "success";
                    return (
                      <tr
                        key={row.dateTime || idx}
                        className="transition-colors hover:bg-slate-100"
                      >
                        <td className="px-4 py-3">
                          <span className="text-medium">{formatDisplayDateTime(row.dateTime)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono">{row.ipAddress || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-medium">{browser}</div>
                            <div className="text-xs text-slate-500">
                              {device}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {isSuccess ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <span className="inline-flex items-center gap-1">
                                <CheckCircle className="!h-4 !w-4" />{" "}
                                Success
                              </span>
                            </Badge>
                          ) : (
                            <Badge className="bg-rose-100 text-rose-700 border-rose-200">
                              <span className="inline-flex items-center gap-1">
                                <Cancel className="!h-4 !w-4" /> Failed
                              </span>
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityTab;
