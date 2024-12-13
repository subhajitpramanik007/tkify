import React from "react";
import { SessionContext } from "@/providers";

export const useSession = () => {
  const context = React.useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return {
    isAuthenticated: context.session.isAuthenticated,
    session: {
      user: context.session.user,
      status: context.session.status
    },
    isInitializing: context.isInitializing,
    updateSession: context.updateSession
  };
};
