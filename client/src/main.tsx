import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { providers } from "@/providers";

import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <providers.ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <providers.SessionProvider>
            <providers.SocketProvider>
              <providers.AuthProvider>
                <providers.ChatProvider>
                  <App />
                </providers.ChatProvider>
              </providers.AuthProvider>
            </providers.SocketProvider>
          </providers.SessionProvider>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </providers.ThemeProvider>
  </StrictMode>
);
