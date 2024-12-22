import { Outlet } from "react-router";
import EstablishmentNavbar from "./EstablishmentNavbar";
import EstablishmentHeader from "./EstablishmentHeader";

function EstablishmentLayout() {
  return (
    <div className="flex-1 flex flex-row">
      <EstablishmentNavbar />
      <div className="flex-1">
        <EstablishmentHeader />
        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default EstablishmentLayout;
