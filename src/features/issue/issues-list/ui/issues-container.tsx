import type { ReactNode } from "react";

export const IssuesContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">{props.children}</main>
    </>
  );
};
