import { Outlet } from "react-router";
import EstablishmentProvider from "@/context/establishment/establishment-provider";

function EstablishmentLayout() {
  return (
    <EstablishmentProvider>
      <div className="flex-1 flex flex-row">
        <div className="h-[calc(100dvh-4rem)] sticky top-8">

        </div>
        <div className="flex-1 h-[200dvh]">
          <Outlet />
        </div>
      </div>
    </EstablishmentProvider>
  );
}
export default EstablishmentLayout;
