import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthCardHeader } from "@/components/auth/auth-card-header";
import { WelcomeLayout } from "@/layout/welcome-layout";
import { WelcomeProvider } from "@/hooks/use-welcome";

export default function Register() {
  return (
    <WelcomeProvider>
      <WelcomeLayout>
        <Card className="w-full max-w-md z-30">
          <AuthCardHeader headerText="Register" />
          <CardContent>
            <RegisterForm />
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </WelcomeLayout>
    </WelcomeProvider>
  );
}
