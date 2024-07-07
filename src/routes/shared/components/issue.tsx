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
export const Issue = ({
  issue,
  selectedIssues,
  handleIssueSelection,
}: IssueProps) => {
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
      <li className="hover:bg-[#e1e1e1] hover:rounded-md flex gap-4 px-8 border-0 border-solid border-b border-gray-300  leading-8 items-center">
        <input
          type="checkbox"
          value={issue.checked.toString()}
          checked={selectedIssues.includes(issue.id)}
          onChange={() => handleIssueSelection(issue.id)}
        />

        <Link className="flex justify-between flex-grow" to={`${issue.id}`}>
          <Select
            defaultSelectedKey={selectedKey}
            onSelectionChange={(selected) => setSelectedKey(selected)}
            className="flex flex-col gap-1 w-fit"
          >
            <Button>
              <SelectValue>
                {selectedItem && (
                  <span className="flex gap-2 items-center">
                    {selectedItem.icon}
                    {selectedItem.text}
                  </span>
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
          <header>{issue.title}</header>

          <span className="">{dateFormatter.format(new Date(issue.date))}</span>
        </Link>
      </li>
    </>
  );
};
