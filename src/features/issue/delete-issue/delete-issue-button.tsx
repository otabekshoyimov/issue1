import { TrashIcon } from "@primer/octicons-react";
import { useFetcher } from "react-router-dom";

export const DeleteIssueButton = (props: { selectedIssues: string[] }) => {
  const fetcher = useFetcher();
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
