import { TrashIcon } from "@primer/octicons-react";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

export const DeleteIssueButton = (props: {
  selectedIssues: string[];
  clear_selected_issues: () => void;
}) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state == "idle" && fetcher.data?.deleted_issue_ids) {
      props.clear_selected_issues();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="selectedIssueIds" value={props.selectedIssues.join(",")} />
      <button
        disabled={props.selectedIssues.length === 0}
        name="intent"
        value="delete"
        type="submit"
        className="flex max-w-fit items-center gap-1 rounded-md text-sm outline outline-1 enabled:text-red-400 enabled:outline-red-400 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        <TrashIcon
          className={`${props.selectedIssues.length === 0 ? "text-gray-300" : "text-red-400"}`}
          size={14}
        />
        {fetcher.state === "submitting" ? (
          <p className="loading-ellipsis text-[13px] font-medium">Deleting</p>
        ) : (
          <p className="text-[13px] font-medium">Delete</p>
        )}
      </button>
    </fetcher.Form>
  );
};
