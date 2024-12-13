import React from "react";
import { AuthRoutes } from "@/lib/routes";
import { useSession } from "@/hooks/use-session";
import { useLocation, useNavigate } from "react-router";

export default function ProctectedLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useSession();

  React.useEffect(() => {
    if (!isAuthenticated && !AuthRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
