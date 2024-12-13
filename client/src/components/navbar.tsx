import React from "react";
import { Button } from "./ui/button";
import { NavItems } from "@/lib/nav-items";
import { useNavigate } from "react-router";
import { ShowEachItems } from "./show-list-items";
import { useChat } from "@/providers";

const ShowNavItems = () => {
  const navigate = useNavigate();
  const { changeMobilePage } = useChat();

  const onCLick = (path: string) => {
    navigate(path);
    changeMobilePage("contacts");
  };

  return (
    <ShowEachItems
      items={NavItems}
      render={(item) => (
        <Button variant="ghost" size="icon" title={item.label} onClick={() => onCLick(item.href)}>
          <item.icon size={24} />
        </Button>
      )}
    />
  );
};

export default function Navbar() {
  return (
    <React.Fragment>
      <div className="hidden md:flex flex-col items-center py-4  px-2 space-y-4 backdrop-blur-xl border-r bg-background/40">
        <ShowNavItems />
      </div>
      <div className="md:hidden backdrop-blur-lg flex justify-between items-center h-12 px-4 z-50 absolute w-full bottom-0 border-t bg-background/40">
        <ShowNavItems />
      </div>
    </React.Fragment>
  );
}
