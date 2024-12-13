import React from "react";
import Navbar from "@/components/navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex w-full">{children}</main>
    </div>
  );
}
