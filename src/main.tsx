import "@fontsource-variable/noto-sans/wdth.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/lib/i18n.ts";
import "@/assets/css/main.css";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
