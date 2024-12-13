import * as React from "react";
import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import { SessionContext } from "@/providers/SessionProvider";
import { TLoginFormSchema, TRegisterFormSchema } from "@/lib/schemas";
import { loginService, registerService, logoutService } from "@/services/user.services";
import { io } from "socket.io-client";

interface AuthState {
  isLoginPending: boolean;
  loginError: Error | null;
  isRegisterPending: boolean;
  registerError: Error | null;
  isLogoutPending: boolean;
}

interface AuthActions {
  login: (data: TLoginFormSchema) => void;
  register: (data: TRegisterFormSchema) => void;
  logout: () => void;
}

const AuthStateContext = React.createContext<AuthState | undefined>(undefined);
const AuthActionsContext = React.createContext<AuthActions | undefined>(undefined);

const BASE_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { updateSession } = React.useContext(SessionContext)!;

  function socketOnConnect() {
    const socket = io(BASE_URL);
    socket.connect();
  }

  function socketOnDisconnect() {
    const socket = io(BASE_URL);
    socket.disconnect();
  }

  function handleOnMutate() {
    updateSession({
      user: null,
      isAuthenticated: false,
      status: "loading"
    });
  }

  function handleOnSuccess(data: any) {
    updateSession({
      user: data.user,
      isAuthenticated: true,
      status: "authenticated"
    });

    socketOnConnect();
  }

  function handleOnError() {
    updateSession({
      user: null,
      isAuthenticated: false,
      status: "unauthenticated"
    });
  }

  // Register
  const {
    mutate: register,
    isPending: isRegisterPending,
    error: registerError
  } = useMutation({
    mutationFn: registerService,
    onMutate: handleOnMutate,
    onSuccess: (data) => {
      handleOnSuccess(data);
      navigate("/");

      if (localStorage.getItem("email")) {
        localStorage.removeItem("email");
      }
    },
    onError: handleOnError
  });

  // Login
  const {
    mutate: login,
    isPending: isLoginPending,
    error: loginError
  } = useMutation({
    mutationFn: loginService,
    onMutate: handleOnMutate,
    onSuccess: (data) => {
      handleOnSuccess(data);
      navigate("/");

      if (localStorage.getItem("email")) {
        localStorage.removeItem("email");
      }
    },
    onError: handleOnError
  });

  // Logout
  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: logoutService,
    onMutate: handleOnMutate,
    onSuccess: () => {
      updateSession({
        user: null,
        isAuthenticated: false,
        status: "unauthenticated"
      });

      socketOnDisconnect();
    },
    onError: handleOnError
  });

  const state: AuthState = {
    isLoginPending,
    loginError,
    isRegisterPending,
    registerError,
    isLogoutPending
  };

  const actions: AuthActions = {
    login: (data: TLoginFormSchema) => login(data),
    register: (data: TRegisterFormSchema) => register(data),
    logout: () => logout()
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

export { AuthProvider, AuthStateContext, AuthActionsContext };
