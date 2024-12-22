import { useEstablishmentQuery } from "@/queries/establishments";
import { useParams } from "react-router";
import { EstablishmentContext } from "./establishment-context";
import { PropsWithChildren } from "react";

function EstablishmentProvider({ children }: PropsWithChildren) {
  const { estId } = useParams();

  const { data, isPending, isFetching } = useEstablishmentQuery(estId);

  return (
    <EstablishmentContext.Provider
      value={{ establishment: data?.data.data ?? null, isPending, isFetching }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
}
export default EstablishmentProvider;
