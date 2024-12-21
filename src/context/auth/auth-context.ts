import { User } from "@/types/user-type";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: User | null;
  userPending: boolean;
  token: string | null;
  logoutPending: boolean,
  logout: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  userPending: true,
  logoutPending: false,
  logout: async () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
