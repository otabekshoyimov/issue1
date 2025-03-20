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
  selectedIssue: string[];
  onIssueSelect: (issueId: string) => void;
}) => {
  const fetcher = useFetcher();
  const [selectedKey] = useState(props.issue.status);
  const selectedStatus = ISSUE_STATUSES.find((status) => status.key === selectedKey);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li className=" animate-fadeInUp hover:bg-[#e1e1e1] hover:rounded-md flex gap-4 px-5 border-0 border-solid border-b border-gray-300  leading-8 items-center">
        <input
          type="checkbox"
          name="checkbox"
          value={String(props.issue.checked)}
          checked={props.selectedIssue.includes(props.issue.id)}
          onChange={() => {
            props.onIssueSelect(props.issue.id);
          }}
          className="w-4 h-4"
        />

        <Link className="flex justify-between flex-grow items-center" to={`${props.issue.id}`}>
          <Select
            defaultSelectedKey={selectedKey}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onSelectionChange={(selected) => {
              fetcher.submit(
                {
                  id: props.issue.id,
                  status: selected,
                  intent: "updateStatus",
                },
                { method: "post" },
              );
              setIsOpen(false);
            }}
            className={`flex  gap-1 w-fit pr-5 }`}
          >
            <ReactAriaButton>
              <SelectValue className={`flex items-center gap-2 ${isOpen ? "" : ""}`}>
                {selectedStatus && (
                  <>
                    <span className="flex gap-2 items-center">{selectedStatus.icon}</span>

                    {isOpen && (
                      <span className={`text-sm ${isOpen ? "hidden" : ""}`}>
                        {selectedStatus.text}
                      </span>
                    )}
                  </>
                )}
              </SelectValue>
            </ReactAriaButton>
            <Popover
              placement="bottom"
              className="overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 data-[entering]:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
            >
              <ListBox
                className="flex flex-col gap-2 shadow-2xl px-2 py-2 data-[selected]:hidden"
                items={ISSUE_STATUSES}
              >
                {ISSUE_STATUSES.map((status) => (
                  <ListBoxItem key={status.key} className="px-2 flex gap-2 items-center ">
                    <span>{status.icon}</span>

                    {isOpen && (
                      <span
                        className={`data-[selected]:hidden data-[pressed]:hidden data-[focused]:hidden [data-focus-visible]:hidden text-sm ${
                          isOpen ? "" : ""
                        }`}
                      >
                        {status.text}
                      </span>
                    )}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
          <div className="flex-grow justify-between flex items-center">
            <header>{props.issue.title}</header>
            <span className="text-gray-500 text-sm">{format_date(props.issue.date)}</span>
          </div>
        </Link>
      </li>
    </>
  );
};
