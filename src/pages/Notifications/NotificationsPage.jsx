import React from "react";
import { Link } from "react-router-dom";
import { PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { notifications } from "@/data/marine";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="6 unread · filtered to your role and vessel scope" />
      <Panel padded={false}>
        <ul className="divide-y divide-border">
          {notifications.map((n) => (
            <li key={n.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 p-4 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusChip status={n.category} />
                  <p className="text-sm font-medium">{n.title}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.vessel} · {n.time}</p>
              </div>
              <Link to={n.to} className="shrink-0 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">
                {n.action}
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
