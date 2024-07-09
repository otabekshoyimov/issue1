import { ReactNode } from 'react';

type IssuesContainerProps = {
  children: ReactNode;
};

export const IssuesContainer = (props: IssuesContainerProps) => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">{props.children}</main>
    </>
  );
};
