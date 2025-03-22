import { BacklogIcon } from "../../../../shared/ui/icons/backlog-icon";

export const IssuesListHeader = () => {
  return (
    <>
      <div className="px-5 py-2 bg-[#f6f6f6] border-0 border-b border-solid border-gray-300 flex items-center gap-2 text-sm">
        <BacklogIcon name="Backlog" width={14} height={14} />{" "}
        <span className="text-[13px] font-medium text-gray-700">Backlog</span>
      </div>
    </>
  );
};
