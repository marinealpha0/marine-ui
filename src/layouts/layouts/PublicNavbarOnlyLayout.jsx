import { Outlet } from "react-router-dom";

export function PublicNavbarOnlyLayout() {

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
