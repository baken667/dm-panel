import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/app/ProtectedRoute";

const EstablishmentLayout = lazy(
  () => import("../components/layouts/establishment/EstablishmentLayout")
);
const EstablishmentsPage = lazy(
  () => import("../pages/establishments/EstablishmentsPage")
);
const UsersPage = lazy(() => import("../pages/users/UsersPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const EstablishmentPage = lazy(
  () => import("../pages/establishments/EstablishmentPage")
);

function AppRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/" element={<EstablishmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/establishments/:estId" element={<EstablishmentLayout />}>
          <Route path="" element={<EstablishmentPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
