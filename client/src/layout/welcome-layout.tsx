import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/grid-pattern";
import { TypingAnimation } from "../components/typing-text-animation";

export function WelcomeLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative flex flex-col justify-around h-screen size-full items-center overflow-hidden rounded-lg border p-10 md:shadow-xl bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter">
        <TypingAnimation
          className="text-4xl font-bold tracking-widest bg-gradient-to-br from-purple-600 to-fuchsia-600 text-transparent bg-clip-text"
          text="Welcome to TKIFY"
        />
      </div>
      {children}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn("[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")}
      />
    </div>
  );
}
