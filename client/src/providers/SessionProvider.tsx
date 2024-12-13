import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMeService, refreshTokenService } from "@/services/user.services";
import { Session } from "@/lib/types";

interface SessionState {
  isInitializing: boolean;
  session: Session;
  updateSession: (data: Partial<Session>) => void;
}

const initialSession: Session = {
  user: null,
  isAuthenticated: false,
  status: "loading"
};

const SessionContext = React.createContext<SessionState | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = React.useState<Session>(initialSession);
  const [isInitializing, setIsInitializing] = React.useState(true);

  const updateSession = React.useMemo(
    () => (data: Partial<Session>) => {
      setSession((prevSession) => ({ ...prevSession, ...data }));
    },
    []
  );

  const { data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeService,
    enabled: session.isAuthenticated,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });

  const { mutate } = useMutation({
    mutationKey: ["user", "refreshToken"],
    mutationFn: refreshTokenService,
    onMutate: () => {
      updateSession({ status: "loading" });
    },
    onSuccess: (data) => {
      updateSession({
        user: data.user,
        isAuthenticated: true,
        status: "authenticated"
      });
    },
    onSettled: () => {
      setIsInitializing(false);
    }
  });

  React.useEffect(() => {
    mutate();
    const startInterval = setInterval(() => mutate(), 1000 * 60 * 30);

    return () => clearInterval(startInterval);
  }, [mutate]);

  React.useEffect(() => {
    if (data) {
      updateSession({
        user: data.user,
        isAuthenticated: true,
        status: "authenticated"
      });
    }
  }, [updateSession, data]);

  return (
    <SessionContext.Provider value={{ isInitializing, session, updateSession }}>{children}</SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
