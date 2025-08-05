import type { ReactNode } from "react";

export const IssuesContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="mb-2 rounded-md bg-[#fbfbfb]">{props.children}</main>
    </>
  );
};
