import { Link, Outlet } from 'react-router-dom';
import { RefObject, useRef, useState } from 'react';
import { NewIssueSVG } from '../shared/components/svgs/new-issue';
import { SearchSVG } from '../shared/components/svgs/search';
import { InboxSVG } from '../shared/components/svgs/inbox-svg';
import { IssuesSVG } from '../shared/components/svgs/issues';
import { ViewsSVG } from '../shared/components/svgs/views';

export const Root = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsSidebarVisible(false);
    }
  };
  const closeDialogOnBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-row w-full h-full min-h-full">
        <div>
          <RootSidebar
            onDialogClick={openDialog}
            isNavVisible={isSidebarVisible}
          />
        </div>
        <div className="root-outlet flex-col flex-shrink-0 basis-0 min-w-0 ">
          <Outlet
            context={{
              closeDialogOnBackdropClick,
              dialogRef,
              toggleSidebar,
              setIsSidebarVisible,
            }}
          />
        </div>
      </div>
    </>
  );
};

export type OutletContext = {
  closeDialogOnBackdropClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  toggleSidebar: () => void;
  setIsSidebarVisible: (value: boolean) => void;
};

//#region MARK: RootSidebar

const RootSidebar = (props: {
  onDialogClick: () => void;
  isNavVisible: boolean;
}) => {
  return (
    <>
      <div className="lg:w-[255px] md:0px"></div>
      <div
        className={` nav-wrapper left-0 top-0 bottom-0 w-[255px] fixed ${
          props.isNavVisible ? 'nav-visible' : ''
        } ${props.isNavVisible ? 'animate-fadeInLeft' : ''}`}
      >
        <nav
          className={` min-w-[220px] max-w-[255px] h-dvh border-0 border-r border-solid border-gray-300 text-sm nav-global bg-[#ececec] flex flex-col relative `}
        >
          <header className="max-lg:pt-10 flex gap-1 justify-between items-center px-4 min-[360px]:pt-10 lg:pt-3 pb-3">
            <button className="hover:bg-[#e1e1e1]">
              <div className="p-1">
                <Link to={'/'}>
                  <div className="bg-green-600 text-white rounded-md ">
                    <span className="px-1 ">O</span>
                  </div>
                </Link>
              </div>
            </button>

            <a
              className="hover:bg-[#e1e1e1] rounded-md leading-6 px-2"
              href="https://github.com/otabekshoyimov/not-linear"
            >
              Github
            </a>
          </header>
          <main className="pt-2">
            <div className="px-4">
              <button
                onClick={props.onDialogClick}
                className=" hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 mb-6 w-full outline outline-1 outline-gray-300 rounded-md shadow-sm p-1 pl-2 "
              >
                <NewIssueSVG
                  name="NewIssue"
                  width={16}
                  height={16}
                  className="group-hover:text-black text-[#575859]"
                />
                New issue
              </button>
            </div>
            <ul className="flex flex-col gap-1 px-4 mb-5">
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 outline outline-1 outline-gray-300 rounded-md group ">
                <SearchSVG
                  name="Search"
                  width={16}
                  height={16}
                  className="group-hover:text-black text-[#575859]"
                />
                <input
                  className="w-full flex gap-2 bg-[#ececec] leading-4 text-base"
                  placeholder="Search"
                />
              </li>
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md items-center  group ">
                <a href="" className="w-full flex gap-2">
                  <InboxSVG
                    name="Inbox"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  Inbox
                </a>
              </li>
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 group ">
                <a href="" className="flex gap-2 w-full">
                  <IssuesSVG
                    name="Issues"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  Issues
                </a>
              </li>
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2  group">
                <a href="" className="flex gap-2 w-full">
                  <ViewsSVG
                    name="Views"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  Views
                </a>
              </li>
            </ul>
            <details className="px-4">
              <summary className="hover:bg-gray-300 rounded-md px-3 leading-6">
                Your team
              </summary>
              <ul className="mt-4">
                <li className="hover:bg-[#e1e1e1] hover:rounded-md group ">
                  <a href="" className="flex items-center gap-3 pl-6 h-7">
                    <InboxSVG
                      name="Inbox"
                      width={16}
                      height={16}
                      className="text-[#575859] group-hover:text-black"
                    />
                    Issues
                  </a>
                </li>
                <div className="ml-8 pl-4 border-0 border-l border-solid border-gray-300 flex flex-col gap-1">
                  <li className=" hover:bg-[#e1e1e1] hover:rounded-md">
                    <a href="" className="flex items-center gap-2 h-7 pl-1">
                      Active
                    </a>
                  </li>
                  <li className=" hover:bg-[#e1e1e1] hover:rounded-md">
                    <a href="" className="flex items-center gap-2 h-7 pl-1">
                      Backlog
                    </a>
                  </li>
                </div>
              </ul>
            </details>
          </main>
        </nav>
      </div>
    </>
  );
};
//#endregion
