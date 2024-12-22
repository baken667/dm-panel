import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./auth/auth-provider";
import queryClient from "@/lib/queryClient";

function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
