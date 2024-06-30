import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

import { CloseSVG } from './components/close-button';
import { UserSVG } from './components/user-svg';
import { BacklogSVG } from './components/backlog-svg';
import { CircleDashedSVG } from './components/circle-dashed';
import { TodoSVG } from './components/todo-svg';
import { InProgressSVG } from './components/in-progess';
import { DoneSVG } from './components/done';
import { CancelledSVG } from './components/cancelled';

export const Index = () => {
  const { dialogRef } = useOutletContext<DialogProps>();
  const [issues, setIssues] = useState<any>(() => {
    const savedIssues = window.localStorage.getItem('issues');
    return savedIssues ? JSON.parse(savedIssues) : [];
  });
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDescription, setNewIssueDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.localStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newIssueTitle) {
      setError('Input cannot be empty. Please try again!');
      return;
    }
    const newIssue = {
      id: crypto.randomUUID(),
      title: newIssueTitle,
      description: newIssueDescription,
      checked: false,
    };

    setIssues([...issues, newIssue]);
    setNewIssueTitle('');
    setNewIssueDescription('');
    setError('');
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <Dialog
        handleFormSubmit={handleFormSubmit}
        setNewIssueTitle={setNewIssueTitle}
        setNewIssueDescription={setNewIssueDescription}
        error={error}
      />
      <main className="bg-[#fbfbfb] mb-2 rounded-md">
        <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
          <div className="flex items-center h-9 gap-10 pl-8">
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
        </header>

        <section className="text-sm">
          <header className="px-8 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2">
            <BacklogSVG name="Backlog" width={14} height={14} /> Backlog
          </header>
          <main>
            <div className="border-0 border-b border-solid border-gray-300 px-8 py-2">
              <ul>
                {issues.map((issue) => (
                  <li className="flex gap-4 items-center" key={issue.id}>
                    <input type="checkbox" value={issue.checked} />

                    <header>{issue.title}</header>
                    <p>{issue.description}</p>
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

const Dialog = ({
  handleFormSubmit,
  setNewIssueTitle,
  setNewIssueDescription,
  error,
}) => {
  const {
    dialogInnerRef,
    dialogInnerStopPropagation,
    handleDialogClick,
    dialogRef,
  } = useOutletContext<DialogProps>();

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
              <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
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

type DialogProps = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;
  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
};
