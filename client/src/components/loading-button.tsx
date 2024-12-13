import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ILoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const LoadingButton: React.FC<ILoadingButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};
