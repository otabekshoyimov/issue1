import { ReactNode } from 'react';

type IssuesListProps = {
  children: ReactNode;
};
export const IssuesList = (props: IssuesListProps) => {
  return (
    <>
      <main className="border-0 border-b border-solid border-gray-300 ">
        {props.children}
      </main>
    </>
  );
};
