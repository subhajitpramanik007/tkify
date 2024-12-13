import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface LogOutDialogProps {
  text?: string;
}

export const LogOutDialog: React.FC<LogOutDialogProps> = ({ text }) => {
  const { logout } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {text ? (
          <Button variant="destructive" title="Logout">
            {text}
          </Button>
        ) : (
          <Button variant="outline" size="icon" title="Logout">
            <LogOut size={24} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>
        <div className="flex justify-end space-x-4 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => logout()}>
              Logout
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
