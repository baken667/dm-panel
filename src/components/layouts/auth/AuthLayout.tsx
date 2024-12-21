import Logo from "@/components/common/AppLogo";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center items-center lg:hidden">
          <Logo className="fill-primary w-auto h-10" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Outlet />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex items-center justify-center">
        <Logo className="fill-primary w-1/3 h-auto" />
      </div>
    </div>
  );
}
export default AuthLayout;
