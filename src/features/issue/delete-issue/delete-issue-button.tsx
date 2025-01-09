import { TrashIcon } from "@primer/octicons-react";
import { useFetcher } from "react-router-dom";

export const DeleteIssueButton = (props: { selectedIssues: string[] }) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <input
        type="hidden"
        name="selectedIssueIds"
        value={props.selectedIssues.join(",")}
      />
      <button
        disabled={props.selectedIssues.length === 0}
        name="intent"
        value="delete"
        type="submit"
        className="flex gap-1 items-center disabled:cursor-not-allowed disabled:text-gray-300 px-2 max-w-fit enabled:text-red-400 outline-1 outline enabled:outline-red-400 text-sm rounded-md "
      >
        <TrashIcon
          className={`${
            props.selectedIssues.length === 0 ? "text-gray-300" : "text-red-400"
          }`}
          size="small"
        />
        {fetcher.state === "submitting" ? (
          <p className="loading-ellipsis">Deleting</p>
        ) : (
          <p>Delete</p>
        )}
      </button>
    </fetcher.Form>
  );
};