import React from "react";
import { AuthStateContext, AuthActionsContext } from "@/providers/AuthProvider";

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }

  return { ...context };
};

const useAuthActions = () => {
  const context = React.useContext(AuthActionsContext);

  if (context === undefined) {
    throw new Error("useAuthActions must be used within an AuthProvider");
  }

  return { ...context };
};

export const useAuth = () => {
  return {
    ...useAuthState(),
    ...useAuthActions()
  };
};
