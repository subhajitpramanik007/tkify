import * as z from "zod";

const Password = z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters");

const Email = z.string({ message: "Email is required" }).email("Invalid email address");

const LoginFormSchema = z.object({
  email: Email,
  password: Password
});

const RegisterFormSchema = z.object({
  name: z.string({ message: "Name is required" }).min(5, "Name must be at least 5 characters"),
  email: Email,
  password: Password
});

type IsEmail = z.infer<typeof Email>;
type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export { LoginFormSchema, RegisterFormSchema, Email };

export type { TLoginFormSchema, TRegisterFormSchema, IsEmail };
