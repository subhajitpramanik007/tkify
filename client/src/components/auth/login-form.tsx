import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, TLoginFormSchema } from "@/lib/schemas";

import { Form, FormField, FormMessage, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { LoadingButton } from "@/components/loading-button";

import { useAuth } from "@/hooks/use-auth";

const LoginForm = () => {
  const { login, loginError, isLoginPending } = useAuth();

  const email = localStorage.getItem("email");
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: email || "",
      password: ""
    }
  });

  const onSubmit = (data: TLoginFormSchema) => login(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Password" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!loginError && <FormError error={loginError} />}
        <div>
          <LoadingButton type="submit" isLoading={isLoginPending}>
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export { LoginForm };
