import { PropsWithChildren } from "react";
import { useAuth } from "@/context/auth/auth-context";
import { UserRole } from "@/types/user-type";

interface Props extends PropsWithChildren {
  roles?: UserRole[];
}

function ProtectedComponent({ children, roles }: Props) {
  const { user } = useAuth();

  if (!roles) {
    return children;
  }

  if (user && roles.includes(user.role)) {
    return children;
  }

  return null;
}

export default ProtectedComponent;
