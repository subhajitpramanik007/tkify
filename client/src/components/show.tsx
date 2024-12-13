import React from "react";

export const Show = ({
  when,
  children,
  className
}: {
  when: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={className}>{when ? children : null}</span>;
};
