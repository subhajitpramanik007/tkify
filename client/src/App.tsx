import * as React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import { Home, Login, Register, Profile, GroupChat, About, Settings } from "@/pages";

import { AuthRoutes } from "./lib/routes";
import { useSession } from "./hooks/use-session";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitializing } = useSession();

  React.useEffect(() => {
    if (isInitializing) return;

    const isAuthRoute = AuthRoutes.includes(location.pathname);
    const shouldRedirect = (!isAuthRoute && !isAuthenticated) || (isAuthRoute && isAuthenticated);

    if (shouldRedirect) navigate("/");
  }, [isInitializing, isAuthenticated, location.pathname, navigate]);

  React.useEffect(() => {
    return () => {
      localStorage.removeItem("email");
      localStorage.removeItem("initial-render");
    };
  }, []);

  return (
    <div className="bg-background">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/group-chats" element={<GroupChat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
