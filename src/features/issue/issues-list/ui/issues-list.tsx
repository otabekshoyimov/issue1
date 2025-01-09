import type { ReactNode } from "react";

export const IssuesList = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="border-0 border-b border-solid border-gray-300 ">
        {props.children}
      </main>
    </>
  );
};
