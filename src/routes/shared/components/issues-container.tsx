import { ReactNode } from 'react';

type IssuesContainerProps = {
  children: ReactNode;
};

export const IssuesContainer = ({ children }: IssuesContainerProps) => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">{children}</main>
    </>
  );
};
