import React from "react";

export function ShowEachItems<T>({
  items,
  render
}: {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <React.Fragment>
      {items.map((item, index) => (
        <React.Fragment key={index}>{render(item, index)}</React.Fragment>
      ))}
    </React.Fragment>
  );
}
