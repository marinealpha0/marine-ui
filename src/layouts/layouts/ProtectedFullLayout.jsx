import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/layouts/Sidebar";
import { Header } from "@/layouts/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function ProtectedFullLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Module & Submodule Shadcn Sidebar */}
        <Sidebar />

        {/* Main Content Inset Container */}
        <SidebarInset className="flex flex-1 flex-col h-screen min-w-0 overflow-hidden bg-background">
          {/* Header Bar */}
          <Header />

          {/* Page Outlet */}
          <main className="flex-1 overflow-y-auto min-w-0 p-6 sm:p-8">
            <div className="mx-auto max-w-[1600px] space-y-8 pb-10">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
