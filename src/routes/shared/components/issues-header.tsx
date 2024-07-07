import { Button } from './button';

type IssuesHeaderProps = {
  handleSelecetedIssue: () => void;
  selectedIssues: string[];
};
export const IssuesHeader = ({
  handleSelecetedIssue,
  selectedIssues,
}: IssuesHeaderProps) => {
  return (
    <>
      <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
        <div className="flex px-8 h-9 gap-10 ">
          <div className="flex items-center justify-center gap-10">
            <button className="">Click </button>
            <span>All issues</span>
          </div>
          <div className="flex-grow justify-end flex items-center">
            <Button
              text="Delete"
              onClick={handleSelecetedIssue}
              disabled={selectedIssues.length === 0}
            />
          </div>
        </div>
      </header>
    </>
  );
};
