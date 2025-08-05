import { MarkGithubIcon } from "@primer/octicons-react";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { Form, Link, NavLink, useNavigation } from "react-router-dom";
import { CreateIssueDialog } from "../../../features/issue/create-issue/ui/create-issue-dialog";
import { InboxIcon } from "../../../shared/ui/icons/inbox-icon";
import { IssuesIcon } from "../../../shared/ui/icons/issues-icon";
import { NewIssueIcon } from "../../../shared/ui/icons/new-issue-icon";
import { SearchIcon } from "../../../shared/ui/icons/search-icon";
import { ViewsIcon } from "../../../shared/ui/icons/views-icon";
import { SidebarNavlinkListItem } from "./sidebar-navlink-item";
import { Spinner } from "../../../shared/ui/spinner";

export const Sidebar = (props: { isNavVisible: boolean; toggle_sidebar: () => void }) => {
  const navigation = useNavigation();
  const dialog_ref = useRef<HTMLDialogElement>(null);

  const open_dialog = () => {
    if (dialog_ref.current) {
      dialog_ref.current.showModal();
      props.toggle_sidebar();
    }
  };

  return (
    <>
      <div className="md:0px lg:w-[255px]"></div>
      <div
        className={`nav-wrapper fixed bottom-0 left-0 top-0 w-[255px] ${
          props.isNavVisible ? "nav-visible" : ""
        } ${props.isNavVisible ? "animate-fadeInLeft" : ""}`}
      >
        <nav
          className={`nav-global relative flex h-dvh min-w-[220px] max-w-[255px] flex-col border-0 border-r border-solid border-gray-300 bg-[#f5f5f5] text-sm`}
        >
          <header className="justify-between gap-1 px-4 pb-3 max-lg:pt-10 min-[360px]:pt-10 lg:pt-3">
            <div className="flex items-center justify-between">
              <Link
                className="flex justify-between gap-2 rounded-md p-2 hover:bg-[#e8e8e8]"
                to={"/"}
              >
                <button className="rounded-md bg-green-600 text-white">
                  <span className="w-1 px-1">O</span>
                </button>
                <span>Otabek</span>
              </Link>
              {navigation.state === "loading" && (
                <span>
                  <Spinner />
                </span>
              )}
            </div>
          </header>
          <main className="flex-grow pt-2">
            <div className="flex flex-col gap-4 px-4 pb-1">
              <button
                onClick={open_dialog}
                className="flex w-full items-center gap-2 rounded-md p-1 pl-2 shadow-sm outline outline-1 outline-gray-300 hover:rounded-md hover:bg-[#e8e8e8]"
              >
                <NewIssueIcon
                  name="NewIssue"
                  width={14}
                  height={14}
                  className="text-[#575859] group-hover:text-black"
                />
                <span className="text-[13px] font-medium text-gray-700"> New issue</span>
              </button>
              <CreateIssueDialog dialog_ref={dialog_ref} />
              <div className="group mb-1 flex items-center gap-2 rounded-md p-1 pl-2 outline outline-1 outline-gray-300 hover:rounded-md hover:bg-[#e8e8e8]">
                <Form
                  role="search"
                  className="flex items-center gap-2 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
                >
                  <SearchIcon
                    name="Search"
                    width={14}
                    height={14}
                    className="text-[#575859] group-hover:text-black"
                  />
                  <input
                    name="search"
                    className="flex w-full gap-2 bg-transparent text-[13px] font-medium leading-4 text-gray-700 outline-none"
                    placeholder="Search"
                  />
                </Form>
              </div>
            </div>

            <ul className="mb-5 flex flex-col gap-1 px-4 text-[13px] font-medium">
              <SidebarNavlinkListItem>
                <NavLink
                  to="/"
                  className={(isActive) =>
                    `flex w-full items-center gap-2 rounded p-1 pl-2 ${isActive ? "bg-[#e8e8e8]" : ""}`
                  }
                >
                  <InboxIcon
                    name="Inbox"
                    width={14}
                    height={14}
                    className="text-[#575859] group-hover:text-black"
                  />
                  <span>Inbox</span>
                </NavLink>
              </SidebarNavlinkListItem>
              <SidebarNavlinkListItem>
                <NavLink to="" className="flex w-full items-center gap-2 p-1 pl-2">
                  <IssuesIcon
                    name="Issues"
                    width={14}
                    height={14}
                    className="text-[#575859] group-hover:text-black"
                  />
                  <span>Issues</span>
                </NavLink>
              </SidebarNavlinkListItem>
              <SidebarNavlinkListItem>
                <NavLink to="" className="flex w-full items-center gap-2 p-1 pl-2">
                  <ViewsIcon
                    name="Views"
                    width={14}
                    height={14}
                    className="text-[#575859] group-hover:text-black"
                  />
                  <span>Views</span>
                </NavLink>
              </SidebarNavlinkListItem>
            </ul>
            <details className="px-4 pb-5" open>
              <summary className="rounded-md px-3 text-[13px] leading-6 hover:bg-[#e8e8e8]">
                Your team
              </summary>
              <ul className="mt-4">
                <SidebarNavlinkListItem>
                  <a href="" className="flex h-7 items-center gap-3 pl-6">
                    <IssuesIcon
                      name="Issues"
                      width={14}
                      height={14}
                      className="text-[#575859] group-hover:text-black"
                    />
                    Issues
                  </a>
                </SidebarNavlinkListItem>
                <div className="ml-8 flex flex-col gap-1 border-0 border-l border-solid border-gray-300 pl-4">
                  <li className="hover:rounded-md hover:bg-[#e8e8e8]">
                    <a href="" className="flex h-7 items-center gap-2 pl-1">
                      Active
                    </a>
                  </li>
                  <li className="hover:rounded-md hover:bg-[#e8e8e8]">
                    <a href="" className="flex h-7 items-center gap-2 pl-1">
                      Backlog
                    </a>
                  </li>
                </div>
              </ul>
            </details>
          </main>
          <footer className="px-4 pb-5">
            <a
              href="https://github.com/otabekshoyimov/not-linear"
              className="flex items-center gap-2 rounded p-1 pl-2 hover:bg-[#e8e8e8]"
            >
              <MarkGithubIcon size={14} className="text-[13px] font-medium text-[#575859]" />
              Link to Github
            </a>
            <Link
              className="flex max-w-fit items-center rounded-md py-1 pr-1 text-[13px] font-medium text-blue-500 hover:bg-blue-100"
              to={"https://otabeks.vercel.app"}
            >
              <ChevronLeft className="mr-1" size={20} color="#5fa6fa" />
              Portfolio
            </Link>
          </footer>
        </nav>
      </div>
    </>
  );
};
