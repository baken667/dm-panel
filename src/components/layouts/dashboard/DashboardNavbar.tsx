import { NavLink } from "react-router";
import { Home, Loader2, LogOut, User2, Users2 } from "lucide-react";
import AppMiniLogo from "@/components/common/AppMiniLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/auth-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trans } from "react-i18next";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user-type";
import ProtectedComponent from "@/components/app/ProtectedComponent";

interface LinksType {
  to: string;
  icon: React.ReactNode;
  text: string;
  roles?: UserRole[];
}

const links: LinksType[] = [
  {
    to: "/",
    icon: <Home />,
    text: "home",
  },
  {
    to: "/users",
    icon: <Users2 />,
    text: "users",
    roles: ["admin"],
  },
  {
    to: "/profile",
    icon: <User2 />,
    text: "profile",
  },
];

function DashboardNavbar() {
  const { logout, logoutPending } = useAuth();
  return (
    <nav className="w-32 py-8 px-8 h-dvh sticky top-0 bg-white shadow-lg">
      <div className="flex flex-col gap-4 justify-between items-center h-full">
        <NavLink to="/">
          <AppMiniLogo className="fill-primary h-16 w-16" />
        </NavLink>
        <div className="flex flex-col gap-4 items-center">
          {links.map((link) => (
            <ProtectedComponent roles={link.roles} key={link.to}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn("block w-16 h-16 [&_svg]:size-6 p-5 rounded-lg", {
                          "bg-primary text-background": isActive,
                          "hover:bg-accent": !isActive,
                        })
                      }
                    >
                      {link.icon}
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Trans>{link.text}</Trans>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ProtectedComponent>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          disabled={logoutPending}
        >
          {logoutPending ? <Loader2 className="animate-spin" /> : <LogOut />}
        </Button>
      </div>
    </nav>
  );
}
export default DashboardNavbar;
