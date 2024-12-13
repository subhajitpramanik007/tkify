import { Link } from "react-router";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";
import { AuthCardHeader } from "@/components/auth/auth-card-header";
import { WelcomeLayout } from "@/layout/welcome-layout";
import { WelcomeProvider } from "@/hooks/use-welcome";

export default function Login() {
  return (
    <WelcomeProvider>
      <WelcomeLayout>
        <Card className="w-full max-w-md z-30">
          <AuthCardHeader headerText="Login" />
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </WelcomeLayout>
    </WelcomeProvider>
  );
}
