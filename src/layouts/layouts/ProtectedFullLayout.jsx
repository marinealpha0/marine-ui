import { Outlet } from "react-router-dom";

export function ProtectedFullLayout() {
  return (
    <main className="w-full min-h-screen">
      <Outlet />
    </main>
  );
}

