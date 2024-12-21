import { Suspense } from "react";
import DashboardNavbar from "./DashboardNavbar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Outlet, useLocation } from "react-router";

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-dvh w-full flex flex-row">
      <DashboardNavbar />
      <main className="flex-1 p-8 flex flex-col">
        <Suspense
          key={location.key}
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
export default DashboardLayout;
