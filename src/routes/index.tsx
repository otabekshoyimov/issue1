import React, { ReactNode, useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { useIssueContext } from './issueContext';
import { useAddIssue, useDeleteIssues, useIssues } from '../api/api';
import { OutletContext } from './root';
import { OpenNavSVG } from '../shared/components/svgs/open.nav';
import { BacklogSVG } from '../shared/components/svgs/backlog-svg';
import { TodoSVG } from '../shared/components/svgs/todo-svg';
import { InProgressSVG } from '../shared/components/svgs/in-progess';
import { DoneSVG } from '../shared/components/svgs/done';
import { CancelledSVG } from '../shared/components/svgs/cancelled';
import {
  Button as ReactAriaButton,
  Key,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { Button } from '../shared/components/button';
import { Dialog } from '../shared/components/dialog';

export type NewIssue = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  date: string;
};
export const Index = () => {
  const issueContext = useIssueContext();
  const outletContext = useOutletContext<OutletContext>();
  const issuesAsync = useIssues();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const addIssueMn = useAddIssue();
  const deleteIssueMutation = useDeleteIssues();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!issueContext.newIssueTitle) {
      issueContext.setError('Input cannot be empty. Please try again!');
      return;
    }
    const newIssue: NewIssue = {
      id: crypto.randomUUID(),
      title: issueContext.newIssueTitle,
      description: issueContext.newIssueDescription,
      checked: false,
      date: new Date().toISOString(),
    };

    addIssueMn.mutate(newIssue, {
      onSuccess: () => {
        form.reset();
        if (outletContext.dialogRef.current) {
          outletContext.dialogRef.current.close();
        }
        outletContext.setIsNavVisible(false);
        issuesAsync.refetch();
      },
    });
  };

  const handleIssueSelection = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSelecetedIssue = () => {
    deleteIssueMutation.mutate(selectedIssues);
    setSelectedIssues([]);
  };
  if (!issuesAsync.data) return null;

  if (issuesAsync.isLoading) {
    return <div>loading...</div>;
  }
  if (issuesAsync.error) {
    return <div>an error occured {issuesAsync.error.message}</div>;
  }

  return (
    <>
      <Dialog handleFormSubmit={handleFormSubmit} />
      <IssuesContainer>
        <IssuesHeader
          handleSelecetedIssue={handleSelecetedIssue}
          selectedIssues={selectedIssues}
        />
        <IssuesListHeader />
        <IssuesList>
          <ul>
            {issuesAsync.data.map((issue: NewIssue) => (
              <Issue
                issue={issue}
                key={issue.id}
                selectedIssues={selectedIssues}
                handleIssueSelection={handleIssueSelection}
              />
            ))}
          </ul>
          <Outlet />
        </IssuesList>
      </IssuesContainer>
    </>
  );
};

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});

type IssuesContainerProps = {
  children: ReactNode;
};

const IssuesContainer = (props: IssuesContainerProps) => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">{props.children}</main>
    </>
  );
};

type IssuesHeaderProps = {
  handleSelecetedIssue: () => void;
  selectedIssues: string[];
};
const IssuesHeader = (props: IssuesHeaderProps) => {
  const outletContext = useOutletContext<OutletContext>();
  return (
    <>
      <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
        <div className="flex px-4 h-9 gap-10 ">
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => {
                outletContext.handleIsNavVisibleClick();
              }}
              className="flex items-center hover:bg-gray-300 p-1 rounded-md nav-btn z-[97] relative lg:hidden"
            >
              <OpenNavSVG name="OpenNav" width={16} height={16} />
            </button>
            <span>All issues</span>
          </div>
          <div className="flex-grow justify-end flex items-center">
            <Button
              text="Delete"
              onClick={props.handleSelecetedIssue}
              disabled={props.selectedIssues.length === 0}
            />
          </div>
        </div>
      </header>
    </>
  );
};

const IssuesListHeader = () => {
  return (
    <>
      <div className="px-5 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2 text-sm">
        <BacklogSVG name="Backlog" width={14} height={14} /> Backlog
      </div>
    </>
  );
};

type IssuesListProps = {
  children: ReactNode;
};
const IssuesList = (props: IssuesListProps) => {
  return (
    <>
      <main className="border-0 border-b border-solid border-gray-300 ">
        {props.children}
      </main>
    </>
  );
};

//#region MARK: Issue

type IssueProps = {
  issue: NewIssue;
  selectedIssues: string[];
  handleIssueSelection: (issueId: string) => void;
};
const Issue = (props: IssueProps) => {
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
      <li className=" animate-fadeInUp hover:bg-[#e1e1e1] hover:rounded-md flex gap-4 px-5 border-0 border-solid border-b border-gray-300  leading-8 items-center">
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
            className="flex  gap-1 w-fit pr-5"
          >
            <ReactAriaButton>
              <SelectValue className="flex items-center gap-2">
                {selectedItem && (
                  <>
                    <span className="flex gap-2 items-center">
                      {selectedItem.icon}
                    </span>
                    <span className="text-sm ">{selectedItem.text}</span>
                  </>
                )}
              </SelectValue>
            </ReactAriaButton>
            <Popover
              placement="right top"
              className="overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 data-[entering]:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
            >
              <ListBox
                className="flex flex-col gap-2 shadow-2xl px-2 py-2 data-[selected]:hidden"
                items={items}
              >
                {items.map((item) => (
                  <ListBoxItem
                    key={item.key}
                    className="px-2 flex gap-2 items-center"
                  >
                    <span>{item.icon}</span>

                    <span className="data-[selected]:hidden data-[pressed]:hidden data-[focused]:hidden [data-focus-visible]:hidden">
                      {item.text}
                    </span>
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

//#endregion
