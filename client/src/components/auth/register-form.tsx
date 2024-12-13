import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, TRegisterFormSchema } from "@/lib/schemas";

import { Input } from "@/components/ui/input";
import { LoadingButton } from "../loading-button";
import { FormError } from "@/components/form-error";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useAuth } from "@/hooks/use-auth";

const RegisterForm = () => {
  const { register, isRegisterPending, registerError } = useAuth();

  const email = localStorage.getItem("email");
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: email || "",
      password: ""
    }
  });

  const onSubmit = (data: TRegisterFormSchema) => register(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Name" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input type="password" {...field} placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!registerError && <FormError error={registerError} />}
        <div>
          <LoadingButton type="submit" isLoading={isRegisterPending}>
            Register
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export { RegisterForm };
