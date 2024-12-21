import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "@/components/layouts/auth/AuthLayout";
import FullpageLoader from "@/components/common/FullpageLoader";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));

function AuthRouter() {
  return (
    <Suspense fallback={<FullpageLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AuthRouter;
