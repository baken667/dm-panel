import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  actions?: React.ReactNode;
  size?: "default" | "sm";
}

function PageHeader({ children, actions, size = "default" }: Props) {
  return (
    <div className="flex flex-row items-center justify-between pb-5">
      <h1
        className={cn("font-bold", {
          "text-3xl": size === "default",
          "text-xl": size === "sm",
        })}
      >
        {children}
      </h1>

      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
export default PageHeader;
