import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";

function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
