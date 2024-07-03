import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

import { CloseSVG } from './components/close-button';
import { UserSVG } from './components/user-svg';
import { BacklogSVG } from './components/backlog-svg';
import { TodoSVG } from './components/todo-svg';
import { InProgressSVG } from './components/in-progess';
import { DoneSVG } from './components/done';
import { CancelledSVG } from './components/cancelled';
import { useIssueContext } from './issueContext';

type TIssue = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
};
export const Index = () => {
  const { newIssueTitle, newIssueDescription, setError } = useIssueContext();
  const { dialogRef } = useOutletContext<TOutletContext>();

  const [issues, setIssues] = useState<any>(() => {
    const savedIssues = window.localStorage.getItem('issues');
    return savedIssues ? JSON.parse(savedIssues) : [];
  });

  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  useEffect(() => {
    window.localStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!newIssueTitle) {
      setError('Input cannot be empty. Please try again!');
      return;
    }
    const newIssue: TIssue = {
      id: crypto.randomUUID(),
      title: newIssueTitle,
      description: newIssueDescription,
      checked: false,
    };

    setIssues([...issues, newIssue]);
    form.reset();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleIssueSelection = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSelecetedIssue = () => {
    setIssues((prevIssues: TIssue[]) =>
      prevIssues.filter((issue) => !selectedIssues.includes(issue.id))
    );
    setSelectedIssues([]);
  };

  return (
    <>
      <Dialog handleFormSubmit={handleFormSubmit} />
      <main className="bg-[#fbfbfb] mb-2 rounded-md">
        <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
          <div className="flex  h-9 gap-10 pl-8">
            <div className="flex items-center justify-center gap-10">
              <span>All issues</span>

              <button className="outline-1 outline-dashed outline-gray-300 rounded-sm text-gray-500 px-1">
                + Filter
              </button>
              <Select className="flex flex-col gap-1 w-[160px]">
                {/* <Label>Favorite Animal</Label> */}
                <Button>
                  <SelectValue />
                  {/* <span aria-hidden="true">▼</span> */}
                </Button>
                <Popover
                  placement="right"
                  className="overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 data-[entering]:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
                >
                  <ListBox className="flex flex-col gap-2">
                    <ListBoxItem className="px-2 data-[selected]:bg-blue-400 data-[disabled]:bg-gray-100 data-[focused]:bg-gray-200 flex gap-2 items-center">
                      <BacklogSVG name="Backlog" width={14} height={14} />
                      Backlog
                    </ListBoxItem>
                    <ListBoxItem className="px-2 data-[focused]:bg-gray-200 flex gap-2 items-center">
                      <TodoSVG name="Todo" width={14} height={14} />
                      Todo
                    </ListBoxItem>
                    <ListBoxItem className="px-2 data-[focused]:bg-gray-200 flex gap-2 items-center">
                      <InProgressSVG name="InProgress" width={14} height={14} />
                      In Progress
                    </ListBoxItem>
                    <ListBoxItem className="px-2 data-[focused]:bg-gray-200 flex gap-2 items-center">
                      <DoneSVG name="Done" width={14} height={14} />
                      Done
                    </ListBoxItem>
                    <ListBoxItem className="px-2 data-[focused]:bg-gray-200 flex gap-2 items-center">
                      <CancelledSVG name="Cancelled" width={14} height={14} />
                      Cancelled
                    </ListBoxItem>
                  </ListBox>
                </Popover>
              </Select>
            </div>
            <div className="flex-grow justify-end flex pr-6">
              <button
                onClick={handleSelecetedIssue}
                disabled={selectedIssues.length === 0}
              >
                Delete
              </button>
            </div>
          </div>
        </header>

        <section className="text-sm">
          <header className="px-8 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2">
            <BacklogSVG name="Backlog" width={14} height={14} /> Backlog
          </header>
          <main>
            <div className="border-0 border-b border-solid border-gray-300 px-8 py-2">
              <ul>
                {issues.map((issue: TIssue) => (
                  <li className="flex gap-4 items-center" key={issue.id}>
                    <input
                      type="checkbox"
                      value={Number(issue.checked)}
                      checked={selectedIssues.includes(issue.id)}
                      onChange={() => handleIssueSelection(issue.id)}
                    />

                    <header>{issue.title}</header>
                    <p>{issue.description}</p>
                    <footer>{}</footer>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </section>
      </main>
    </>
  );
};

type DialogProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type TOutletContext = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;

  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
};
const Dialog = ({ handleFormSubmit }: DialogProps) => {
  const { setNewIssueTitle, setNewIssueDescription, error } = useIssueContext();
  const {
    dialogInnerRef,
    dialogInnerStopPropagation,
    handleDialogClick,
    dialogRef,
  } = useOutletContext<TOutletContext>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseButtonClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <dialog
        id="dialog"
        ref={dialogRef}
        onClick={handleDialogClick}
        className="shadow-lg"
      >
        <div
          id="dialog-inner"
          ref={dialogInnerRef}
          onClick={dialogInnerStopPropagation}
        >
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              {/* <CustomSelect /> */}
              New Issue
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>

            <button
              onClick={handleCloseButtonClick}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <form
                className="flex flex-col gap-2"
                onSubmit={handleFormSubmit}
                ref={formRef}
              >
                <label htmlFor="" className="font-semibold">
                  <input
                    type="text"
                    placeholder="Issue title"
                    onChange={(e) => setNewIssueTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Add description"
                    onChange={(e) => setNewIssueDescription(e.target.value)}
                  />
                </label>
                <footer>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <button className="">Priority</button>
                    <button className="">Add labels</button>
                  </div>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      className="bg-purple-400 rounded-md px-2 text-white text-sm py-1"
                    >
                      Create Issue
                    </button>
                  </span>
                  {/* <div>{JSON.stringify(newIssueTitle)}</div> */}
                  {/* <div>{JSON.stringify(newIssueDescription)}</div> */}
                  {/* <div>{JSON.stringify(issues)}</div> */}
                </footer>
              </form>
            </div>
          </main>
        </div>
      </dialog>
    </>
  );
};
