// import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppProvider from "@/context/AppProvider";
// import FullpageLoader from "@/components/common/FullpageLoader";
import { Toaster } from "./components/ui/sonner";
import AppEntrypoint from "./components/app/AppEntrypoint";

// const AppEntrypoint = lazy(() => import("@/components/app/AppEntrypoint"));

function App() {
  return (
    <AppProvider>
      <Toaster />
      <BrowserRouter>
        {/* <Suspense fallback={<FullpageLoader />}> */}
          <AppEntrypoint />
        {/* </Suspense> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
