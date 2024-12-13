import React from "react";
import { toast } from "./use-toast";
import { Email } from "@/lib/schemas";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { checkEmailIsExistService } from "@/services/user.services";

interface WelcomeContextType {
  email: string;
  setEmail: (email: string) => void;
  isExistEmail: () => void;
}

const WelcomeContext = React.createContext<WelcomeContextType | undefined>(undefined);

const WelcomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["email", email],
    mutationFn: checkEmailIsExistService,
    onSuccess: (data) => {
      localStorage.setItem("email", email);

      if (data.status === 200) navigate("/login");
      else navigate("/register");
    },
    onError: (error) => {
      toast({ description: error.message, variant: "destructive" });
    }
  });

  const isExistEmail = () => {
    if (!email) return;

    const emailSchema = Email.safeParse(email);
    if (!emailSchema.success) {
      toast({ variant: "destructive", description: "Invalid email address" });
      return;
    }

    mutate(email);
  };

  return <WelcomeContext.Provider value={{ email, setEmail, isExistEmail }}>{children}</WelcomeContext.Provider>;
};

const useWelcome = () => {
  const context = React.useContext(WelcomeContext);
  if (!context) {
    throw new Error("useWelcome must be used within a WelcomeProvider");
  }
  return context;
};

export { WelcomeProvider, useWelcome };
