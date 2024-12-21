import { useAuth } from "@/context/auth/auth-context";
import AppRouter from "@/router/AppRouter";
import AuthRouter from "@/router/AuthRouter";



function AppEntrypoint() {
  const { token } = useAuth();

  if (!token) {
    return <AuthRouter />;
  }

  return <AppRouter />;
}
export default AppEntrypoint;
