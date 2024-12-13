import { TUser } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";

interface UserAvatarProps {
  user?: TUser | { name: string; avatar: string };
  className?: string;
  isOnline?: boolean;
}

export function UserAvatar({ user, className, isOnline }: UserAvatarProps) {
  return (
    <div className="relative">
      {isOnline && (
        <div className="absolute z-10 top-0 right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
      )}
      <Avatar className={cn("border-2", className)}>
        {user && user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback>
            <UserIcon size={24} />
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}
