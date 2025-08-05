import { useState } from "react";
import {
  Select,
  SelectValue,
  Button as ReactAriaButton,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { Link, useFetcher } from "react-router-dom";

import { ISSUE_STATUSES } from "../model/constants";
import type { Issue_Item } from "../model/types";
import { format_date } from "../../../../shared/utils/date/format-date";

export const IssueItem = (props: {
  issue: Issue_Item;
  selectedIssues: string[];
  onIssueSelect: (issueId: string) => void;
}) => {
  const fetcher = useFetcher();
  const [selected_key, set_selected_key] = useState(props.issue.status);
  console.log("key", selected_key, "issue", props.issue);
  const selected_status = ISSUE_STATUSES.find((status) => status.key === selected_key);
  console.log("selected stat", selected_status);
  return (
    <>
      <li className="flex animate-fadeInUp items-center gap-4 border-0 border-b border-solid border-gray-300 px-5 leading-8 hover:rounded-md hover:bg-[#e8e8e8]">
        <input
          type="checkbox"
          name="checkbox"
          value={String(props.issue.checked)}
          checked={props.selectedIssues.includes(props.issue.id)}
          onChange={() => {
            props.onIssueSelect(props.issue.id);
          }}
          className="h-3 w-3"
        />

        <Link className="flex flex-grow items-center justify-between" to={`${props.issue.id}`}>
          <Select
            selectedKey={selected_key}
            onSelectionChange={(selected) => {
              set_selected_key(String(selected));
              fetcher.submit(
                {
                  id: props.issue.id,
                  status: selected,
                  intent: "updateStatus",
                },
                { method: "post" },
              );
            }}
            className={`flex w-fit gap-1 pr-5`}
          >
            <ReactAriaButton>
              <SelectValue className={`flex items-center gap-2`}>
                {selected_status && (
                  <>
                    <span className="flex items-center gap-2">{selected_status.icon}</span>
                  </>
                )}
              </SelectValue>
            </ReactAriaButton>
            <Popover
              placement="bottom"
              className="entering:fade-in exiting:animate-out exiting:fade-out overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 data-[entering]:animate-in"
            >
              <ListBox
                className="flex flex-col gap-2 px-2 py-2 shadow-2xl data-[selected]:hidden"
                items={ISSUE_STATUSES}
              >
                {ISSUE_STATUSES.map((status) => (
                  <ListBoxItem key={status.key} className="flex items-center gap-2 px-2">
                    <span>{status.icon}</span>
                    <span className="text-[13px] font-medium">{status.label}</span>
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
          <div className="flex flex-grow items-center justify-between">
            <span className="text-[13px] font-medium">{props.issue.title}</span>
            <span className="text-[13px] text-gray-500">{format_date(props.issue.date)}</span>
          </div>
        </Link>
      </li>
    </>
  );
};
