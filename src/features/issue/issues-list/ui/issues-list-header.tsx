import { BacklogIcon } from "../../../../shared/ui/icons/backlog-icon";

export const IssuesListHeader = () => {
  return (
    <>
      <div className="px-5 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2 text-sm">
        <BacklogIcon name="Backlog" width={20} height={20} /> Backlog
      </div>
    </>
  );
};