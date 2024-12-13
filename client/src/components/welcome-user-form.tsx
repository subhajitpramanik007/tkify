import { Input } from "./ui/input";
import { ChevronRight } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";
import { useWelcome } from "@/hooks/use-welcome";

export const WelcomeUserForm = () => {
  const { email, setEmail, isExistEmail } = useWelcome();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        isExistEmail();
      }}
      className="flex gap-6 w-full items-center justify-center"
    >
      <div className="relative w-full max-w-sm">
        <Input
          className="w-full max-w-sm shadow-xl py-6 absolute top-0 blur-lg select-none -z-10 shadow-amber-300"
          disabled
        />
        <Input
          className="w-full max-w-sm shadow-xl shadow-primary/40 py-6 z-10"
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="z-10 flex min-h-64 items-center justify-center">
        <ShimmerButton
          className="shadow-2xl"
          background="#7c3aed"
          shimmerSize="0.1rem"
          shimmerColor="#9ae817"
          type="submit"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg flex items-center gap-4">
            Contine
            <ChevronRight className="h-4 w-4" />
          </span>
        </ShimmerButton>
      </div>
    </form>
  );
};
