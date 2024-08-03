import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Button as ReactAriaButton,
  Select,
  SelectValue,
} from 'react-aria-components';
import {
  ActionFunctionArgs,
  json,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
// import { createNewIssueAsync, deleteIssuesAsync } from '../api/api';
import { BacklogSVG } from '../shared/components/svgs/backlog-svg';
import { CancelledSVG } from '../shared/components/svgs/cancelled';
import { DoneSVG } from '../shared/components/svgs/done';
import { InProgressSVG } from '../shared/components/svgs/in-progess';
import { OpenNavSVG } from '../shared/components/svgs/open.nav';
import { TodoSVG } from '../shared/components/svgs/todo-svg';
import { BAD_REQUEST, dateFormatter, OK, SERVER_ERROR } from '../utils/utils';
import { OutletContext } from './root';
import { UserSVG } from '../shared/components/svgs/user-svg';
import { CloseSVG } from '../shared/components/svgs/close-button';
import { pocketbase } from '../pocketbase';

export const loader = async () => {
  // console.log('Loader called');
  // const issues = await JSON.parse(
  //   window.localStorage.getItem('issues') || '[]'
  // );

  const issues = await pocketbase.collection('posts').getFullList();
  console.log('Loaded issues:', issues);
  return { issues };
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    // console.log('Action called');
    const formData = await request.formData();
    // console.log(formData);
    const intent = formData.get('intent');

    const handleCreate = async (formData: FormData) => {
      try {
        const newIssue = {
          // id: crypto.randomUUID(),
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          checked: false,
          date: new Date(),
          status: (formData.get('status') as string) || 'Backlog',
        };
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // await createNewIssueAsync(newIssue);
        const issueRecord = await pocketbase
          .collection('posts')
          .create(newIssue);

        console.log('%c NEW created issue', 'color: red', { newIssue });
        // return json({ newIssue }, { status: 201 });
        return new Response(JSON.stringify(issueRecord), {
          status: 201,
          headers: {
            'Content-Type': 'application/json; utf-8',
          },
        });
      } catch (error) {
        console.log('Create error', error);

        return json(
          { error: 'Failed to create issue' },
          { status: BAD_REQUEST }
        );
      }
    };

    const handleDelete = async (formData: FormData) => {
      try {
        const selectedIssueIds = (
          formData.get('selectedIssueIds') as string
        ).split(',');
        console.log('Selected Issue IDs to delete:', selectedIssueIds);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // const updatedIssues = await deleteIssuesAsync(selectedIssueIds);
        const deletePromises = selectedIssueIds.map((id) =>
          pocketbase.collection('posts').delete(id)
        );
        await Promise.all(deletePromises);
        console.log('%cUpdated Issues', 'color: red', deletePromises);
        return json({ status: OK });
      } catch (error) {
        console.error('Delete error:', error);
        return json(
          { error: 'Failed to delete issues' },
          { status: BAD_REQUEST }
        );
      }
    };

    if (intent === 'create') {
      return await handleCreate(formData);
    }
    if (intent === 'delete') {
      return await handleDelete(formData);
    }
    return new Response(JSON.stringify({ error: 'Unknown intent' }), {
      status: BAD_REQUEST,
      headers: { 'Content-Type': 'application/json; utf-8' },
    });
  } catch (error) {
    console.error('Action error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: SERVER_ERROR,
        headers: { 'Content-Type': 'application/json; utf-8' },
      }
    );
  }
}

type PocketBaseIssue = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  checked: boolean;
  date: string;
  status: string;
};

type loaderData = {
  issues: PocketBaseIssue[];
};

export const Index = () => {
  const { issues } = useLoaderData() as loaderData;

  // console.log('Rendered issues:', issuesAsync);
  const navigation = useNavigation();
  // console.log(issuesAsync);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  console.log(selectedIssues);

  const handleIssueSelection = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  if (navigation.state === 'loading') {
    return <div>loading...</div>;
  }
  return (
    <>
      <Dialog />
      <IssuesContainer>
        <IssuesHeader selectedIssues={selectedIssues} />
        <IssuesListHeader />
        <IssuesList>
          <ul>
            {issues.map((issue: PocketBaseIssue) => (
              <Issue
                issue={issue}
                key={issue.id}
                selectedIssue={selectedIssues}
                onIssueSelect={handleIssueSelection}
              />
            ))}
          </ul>
          <Outlet />
        </IssuesList>
      </IssuesContainer>
    </>
  );
};

const IssuesContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">{props.children}</main>
    </>
  );
};

export const IssuesHeader = (props: { selectedIssues: string[] }) => {
  const outletContext = useOutletContext<OutletContext>();
  const fetcher = useFetcher();

  return (
    <>
      <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
        <div className="flex px-4 h-9 gap-10 ">
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => {
                outletContext.toggleSidebar();
              }}
              className="flex items-center hover:bg-gray-300 p-1 rounded-md nav-btn z-[97] relative lg:hidden"
            >
              <OpenNavSVG name="OpenNav" width={20} height={20} />
            </button>
            <span>All issues</span>
          </div>
          <div className="flex-grow justify-end flex items-center">
            <fetcher.Form method="post">
              <input
                type="hidden"
                name="selectedIssueIds"
                value={props.selectedIssues.join(',')}
              />
              <button
                disabled={props.selectedIssues.length === 0}
                name="intent"
                value="delete"
                type="submit"
                className="disabled:cursor-not-allowed disabled:text-gray-300 px-2 max-w-fit"
              >
                {fetcher.state === 'submitting' ? (
                  <span className="loading-ellipsis">Deleting</span>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </fetcher.Form>
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
        <BacklogSVG name="Backlog" width={20} height={20} /> Backlog
      </div>
    </>
  );
};

const IssuesList = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="border-0 border-b border-solid border-gray-300 ">
        {props.children}
      </main>
    </>
  );
};

//#region MARK: Issue

const Issue = (props: {
  issue: PocketBaseIssue;
  selectedIssue: string[];
  onIssueSelect: (issueId: string) => void;
}) => {
  const items: {
    key: string;
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'Backlog',
      text: 'Backlog',
      icon: (
        <BacklogSVG
          name="Backlog"
          width={20}
          height={20}
          className="flex items-center"
        />
      ),
    },
    {
      key: 'Todo',
      text: 'Todo',
      icon: (
        <TodoSVG
          name="Todo"
          width={20}
          height={20}
          className="flex items-center"
        />
      ),
    },
    {
      key: 'InProgress',
      text: 'In Progress',
      icon: (
        <InProgressSVG
          name="InProgress"
          width={20}
          height={20}
          className="flex items-center"
        />
      ),
    },
    {
      key: 'Done',
      text: 'Done',
      icon: (
        <DoneSVG
          name="Done"
          width={20}
          height={20}
          className="flex items-center"
        />
      ),
    },
    {
      key: 'Cancelled',
      text: 'Cancelled',
      icon: (
        <CancelledSVG
          name="Cancelled"
          width={20}
          height={20}
          className="flex items-center"
        />
      ),
    },
  ];
  // const { issues } = useLoaderData() as loaderData;

  const [selectedKey, setSelectedKey] = useState(props.issue.status);
  useEffect(() => {
    const issues = JSON.parse(localStorage.getItem('issues') || '[]');
    const updatedIssues = issues.map((issue: PocketBaseIssue) =>
      issue.id === props.issue.id ? { ...issue, status: selectedKey } : issue
    );
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  }, [selectedKey, props.issue.id]);
  const selectedItem = items.find((item) => item.key === selectedKey);
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

        <Link
          className="flex justify-between flex-grow"
          to={`${props.issue.id}`}
        >
          <Select
            defaultSelectedKey={selectedKey}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onSelectionChange={(selected) => {
              setSelectedKey(selected as string);
              setIsOpen(false);
            }}
            className={`flex  gap-1 w-fit pr-5 }`}
          >
            <ReactAriaButton>
              <SelectValue
                className={`flex items-center gap-2 ${isOpen ? '' : ''}`}
              >
                {selectedItem && (
                  <>
                    <span className="flex gap-2 items-center">
                      {selectedItem.icon}
                    </span>

                    {isOpen && (
                      <span className={`text-sm ${isOpen ? 'hidden' : ''}`}>
                        {selectedItem.text}
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
                items={items}
              >
                {items.map((item) => (
                  <ListBoxItem
                    key={item.key}
                    className="px-2 flex gap-2 items-center "
                  >
                    <span>{item.icon}</span>

                    {isOpen && (
                      <span
                        className={`data-[selected]:hidden data-[pressed]:hidden data-[focused]:hidden [data-focus-visible]:hidden text-sm ${
                          isOpen ? '' : ''
                        }`}
                      >
                        {item.text}
                      </span>
                    )}
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

//#region Dialog

const Dialog = () => {
  const fetcher = useFetcher();
  const outletContext = useOutletContext<OutletContext>();
  useEffect(() => {
    if (fetcher.state === 'submitting' && outletContext.dialogRef.current) {
      outletContext.dialogRef.current.close();
    }
  }, [fetcher.state, outletContext]);

  return (
    <>
      <dialog
        id="dialog"
        ref={outletContext.dialogRef}
        onClick={outletContext.closeDialogOnBackdropClick}
        className="shadow-lg animate-fadeInUp"
      >
        <div id="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              New Issue
            </div>

            <button
              onClick={() => {
                if (outletContext.dialogRef.current) {
                  outletContext.dialogRef.current.close();
                }
              }}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <fetcher.Form
                className="flex flex-col gap-2"
                role="form"
                method="post"
              >
                <fieldset>
                  <input type="text" name="title" placeholder="Issue title" />
                  <label htmlFor="" className="font-semibold"></label>
                </fieldset>

                <fieldset>
                  <input
                    type="text"
                    name="description"
                    placeholder="Add description"
                  />
                  <label htmlFor=""></label>
                </fieldset>

                <fieldset>
                  <input type="hidden" name="status" value="Backlog" />
                  <label htmlFor=""></label>
                </fieldset>

                <footer>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      name="intent"
                      value="create"
                      disabled={fetcher.state === 'submitting'}
                      className="bg-green-600 rounded-md px-2 text-white text-sm py-1"
                    >
                      Create issue
                    </button>
                  </span>
                </footer>
              </fetcher.Form>
            </div>
          </main>
        </div>
      </dialog>
    </>
  );
};
//#endregion

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className="disabled:cursor-not-allowed disabled:text-gray-300 disabled:outline-gray-300 enabled:hover:outline-black enabled:hover:text-black shadow-sm px-1 outline outline-1 py-1 text-gray-6  00 outline-gray-400 rounded-md  leading-3"
        {...props}
      >
        {props.text}
      </button>
    </>
  );
};
