import { useState } from 'react';
import { dateFormatter, NewIssue } from '../..';
import { BacklogSVG } from '../../../shared/components/svgs/backlog-svg';
import { CancelledSVG } from '../../../shared/components/svgs/cancelled';
import { DoneSVG } from '../../../shared/components/svgs/done';
import { InProgressSVG } from '../../../shared/components/svgs/in-progess';
import { TodoSVG } from '../../../shared/components/svgs/todo-svg';
import { Link } from 'react-router-dom';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import type { Key } from 'react-aria-components';

type IssueProps = {
  issue: NewIssue;
  selectedIssues: string[];
  handleIssueSelection: (issueId: string) => void;
};
export const Issue = (props: IssueProps) => {
  // Define a type for your items
  type ItemType = {
    key: string;
    text: string;
    icon: React.ReactNode;
  };

  const items: ItemType[] = [
    {
      key: 'Backlog',
      text: 'Backlog',
      icon: <BacklogSVG name="Backlog" width={14} height={14} />,
    },
    {
      key: 'Todo',
      text: 'Todo',
      icon: <TodoSVG name="Todo" width={14} height={14} />,
    },
    {
      key: 'InProgress',
      text: 'In Progress',
      icon: <InProgressSVG name="InProgress" width={14} height={14} />,
    },
    {
      key: 'Done',
      text: 'Done',
      icon: <DoneSVG name="Done" width={14} height={14} />,
    },
    {
      key: 'Cancelled',
      text: 'Cancelled',
      icon: <CancelledSVG name="Cancelled" width={14} height={14} />,
    },
  ];
  const [selectedKey, setSelectedKey] = useState<Key>('Backlog');
  const selectedItem = items.find((item) => item.key === selectedKey);

  return (
    <>
      <li className="hover:bg-[#e1e1e1] hover:rounded-md flex gap-4 px-5 border-0 border-solid border-b border-gray-300  leading-8 items-center">
        <input
          type="checkbox"
          value={props.issue.checked.toString()}
          checked={props.selectedIssues.includes(props.issue.id)}
          onChange={() => props.handleIssueSelection(props.issue.id)}
        />

        <Link
          className="flex justify-between flex-grow"
          to={`${props.issue.id}`}
        >
          <Select
            defaultSelectedKey={selectedKey}
            onSelectionChange={(selected) => setSelectedKey(selected)}
            className="flex  gap-1 w-fit pr-3"
          >
            <Button>
              <SelectValue className="flex items-center gap-2">
                {selectedItem && (
                  <>
                    <span className="flex gap-2 items-center">
                      {selectedItem.icon}
                    </span>
                    <span className="text-sm">{selectedItem.text}</span>
                  </>
                )}
              </SelectValue>
            </Button>
            <Popover
              placement="right top"
              className="overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 data-[entering]:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
            >
              <ListBox
                className="flex flex-col gap-2 items-center"
                items={items}
              >
                {items.map((item) => (
                  <ListBoxItem
                    key={item.key}
                    className="px-2 data-[selected]:bg-blue-400 data-[disabled]:bg-gray-100 data-[focused]:bg-gray-200 flex gap-2 items-center"
                  >
                    {item.icon}
                    {item.text}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
          <div className="flex-grow justify-between flex items-center">
            <header>{props.issue.title}</header>
            <span className="text-gray-500 text-sm">
              {dateFormatter.format(new Date(props.issue.date))}
            </span>
          </div>
        </Link>
      </li>
    </>
  );
};
