import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  actions?: React.ReactNode;
}

function PageHeader({ children, actions }: Props) {
  return (
    <div className="flex flex-row items-center justify-between pb-5">
      <h1 className="text-3xl font-bold">{children}</h1>

      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
export default PageHeader;
