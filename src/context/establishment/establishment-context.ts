import { Establishment } from "@/types/establishment-type";
import { createContext, useContext } from "react";

interface EstablishmentContextType {
  establishment: Establishment | null;
  isPending: boolean
  isFetching: boolean
}

const EstablishmentContext = createContext<EstablishmentContextType>({
  establishment: null,
  isPending: true,
  isFetching: true
})

const useEstablishment = () => {
  return useContext(EstablishmentContext);
};

export { EstablishmentContext, useEstablishment };