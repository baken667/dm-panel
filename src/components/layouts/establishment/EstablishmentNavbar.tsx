import { Skeleton } from "@/components/ui/skeleton";
import { useEstablishment } from "@/context/establishment/establishment-context";
import { cn } from "@/lib/utils";
import { Establishment } from "@/types/establishment-type";
import { Store, Users2 } from "lucide-react";
import { ReactNode } from "react";
import { Trans } from "react-i18next";
import { NavLink } from "react-router";

interface LinksType {
  to: string;
  text: string;
  icon: ReactNode;
}

function getLinks(establishment: Establishment | null): LinksType[] {
  if (!establishment) return [];

  const links: LinksType[] = [
    {
      to: `/establishments/${establishment.id}/main`,
      text: "main_data",
      icon: <Store />,
    },
    {
      to: `/establishments/${establishment.id}/users`,
      text: "users",
      icon: <Users2 />,
    },
  ];

  return links;
}

function NavItem({ link, disabled }: { link?: LinksType, disabled?: boolean }) {
  if (!link) {
    return <Skeleton className="w-52 h-9" />;
  }

  return (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        cn(
          "w-full px-6 py-3 rounded-lg flex flex-row items-center gap-3 text-base [&_svg]:size-5 [&_svg]:shrink-0]",
          {
            "bg-primary hover:bg-primary/90 text-primary-foreground": isActive,
            "bg-accent hover:bg-accent/80": !isActive,
            "pointer-events-none opacity-70": disabled,
          }
        )
      }
    >
      {link.icon}
      <p>
        <Trans>{link.text}</Trans>
      </p>
    </NavLink>
  );
}

function EstablishmentNavbar() {
  const { establishment, isPending, isFetching } = useEstablishment();

  return (
    <div className="h-[calc(100dvh-4rem)] sticky top-8 w-72 pr-8">
      <nav id="establishment-dashboard-navbar" className="flex flex-col gap-4">
        {isPending
          ? Array.from({ length: 5 }).map((_, i) => <NavItem key={i} />)
          : getLinks(establishment).map((link) => (
              <NavItem key={link.to} link={link} disabled={isFetching} />
            ))}
      </nav>
    </div>
  );
}

export default EstablishmentNavbar;
