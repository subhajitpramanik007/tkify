import React from "react";
import { useSession } from "@/hooks/use-session";
import { WelcomeProvider } from "@/hooks/use-welcome";

import UserLayout from "@/layout/user-layout";
import { WelcomeLayout } from "@/layout/welcome-layout";
import { Chat } from "@/components/home";
import { WelcomeUserForm } from "@/components/welcome-user-form";

export default function Home() {
  const { isAuthenticated, isInitializing } = useSession();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const isInitalRender = localStorage.getItem("initial-render");

    if (isInitalRender !== "true") {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("initial-render", "true");
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <WelcomeProvider>
      {isInitializing || isLoading ? (
        <WelcomeLayout />
      ) : (
        <>
          {isAuthenticated ? (
            <UserLayout>
              <Chat />
            </UserLayout>
          ) : (
            <WelcomeLayout>
              <WelcomeUserForm />
            </WelcomeLayout>
          )}
        </>
      )}
    </WelcomeProvider>
  );
}
