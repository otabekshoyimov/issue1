import { BacklogSVG } from '../../../shared/components/svgs/backlog-svg';

export const IssuesListHeader = () => {
  return (
    <>
      <div className="px-5 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2 text-sm">
        <BacklogSVG name="Backlog" width={14} height={14} /> Backlog
      </div>
    </>
  );
};
