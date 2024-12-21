import { useAuth } from "@/context/auth/auth-context";
import { UserRole } from "@/types/user-type";
import FullpageLoader from "../common/FullpageLoader";
import { Outlet } from "react-router";

interface Props {
  roles: UserRole[];
}

function ProtectedRoute({ roles }: Props) {
  const { user, userPending } = useAuth();

  if (userPending) {
    return <FullpageLoader />;
  }

  if (user && roles && roles.includes(user.role)) {
    return <Outlet />;
  }

  return <div>403</div>;
}
export default ProtectedRoute;
