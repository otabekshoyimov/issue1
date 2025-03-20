import { MarkGithubIcon } from "@primer/octicons-react";
import { useRef } from "react";
import { Form, Link, NavLink } from "react-router-dom";
import { CreateIssueDialog } from "../../../features/issue/create-issue/ui/create-issue-dialog";
import { InboxIcon } from "../../../shared/ui/icons/inbox-icon";
import { IssuesIcon } from "../../../shared/ui/icons/issues-icon";
import { NewIssueIcon } from "../../../shared/ui/icons/new-issue-icon";
import { SearchIcon } from "../../../shared/ui/icons/search-icon";
import { ViewsIcon } from "../../../shared/ui/icons/views-icon";
import { ChevronLeft } from "lucide-react";

export const RootSidebar = (props: { isNavVisible: boolean }) => {
  const dialog_ref = useRef<HTMLDialogElement>(null);
  const open_dialog = () => {
    if (dialog_ref.current) {
      dialog_ref.current.showModal();
    }
  };
  return (
    <>
      <div className="lg:w-[255px] md:0px"></div>
      <div
        className={` nav-wrapper left-0 top-0 bottom-0 w-[255px] fixed ${
          props.isNavVisible ? "nav-visible" : ""
        } ${props.isNavVisible ? "animate-fadeInLeft" : ""}`}
      >
        <nav
          className={` min-w-[220px] max-w-[255px] h-dvh border-0 border-r border-solid border-gray-300 text-sm nav-global bg-[#f5f5f5] flex flex-col relative `}
        >
          <header className="max-lg:pt-10  gap-1 justify-between  px-4 min-[360px]:pt-10 lg:pt-3 pb-3">
            <div className=" flex items-center justify-between">
              <Link
                className="items-center flex hover:bg-[#e1e1e1] rounded-md py-1 pr-1 max-w-fit text-blue-400"
                to={"https://otabeks.vercel.app"}
              >
                <ChevronLeft className="mr-1 " color="#5fa6fa" />
                Portfolio
              </Link>
              <Link className="hover:bg-[#e1e1e1] p-2 rounded-md" to={"/"}>
                <button className=" bg-green-600 text-white rounded-md">
                  <span className="px-1 w-1">O</span>
                </button>
              </Link>
            </div>
          </header>
          <main className="pt-2 flex-grow">
            <div className="px-4">
              <button
                onClick={open_dialog}
                className=" hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 mb-6 w-full outline outline-1 outline-gray-300 rounded-md shadow-sm p-1 pl-2 "
              >
                <NewIssueIcon
                  name="NewIssue"
                  width={16}
                  height={16}
                  className="group-hover:text-black text-[#575859]"
                />
                New issue
              </button>
              <CreateIssueDialog dialog_ref={dialog_ref} />
            </div>
            <ul className="flex flex-col gap-1 px-4 mb-5 text-[13px] font-medium">
              <li className="p-1 mb-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 outline outline-1 outline-gray-300 rounded-md group ">
                <Form
                  role="search"
                  className="flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500 rounded-md"
                >
                  <SearchIcon
                    name="Search"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  <input
                    name="search"
                    className="w-full flex gap-2 bg-transparent leading-4  outline-none text-base"
                    placeholder="Search"
                  />
                </Form>
              </li>
              <li className="  hover:bg-[#e1e1e1] hover:rounded-md items-center  group ">
                <NavLink
                  to="/"
                  className={(isActive) =>
                    `w-full p-1 pl-2 rounded items-center flex gap-2 ${isActive ? "bg-[#e8e8e8]" : ""}`
                  }
                >
                  <InboxIcon
                    name="Inbox"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  <span>Inbox</span>
                </NavLink>
              </li>
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 group ">
                <a href="" className="items-center flex gap-2 w-full">
                  <IssuesIcon
                    name="Issues"
                    width={16}
                    height={16}
                    className=" group-hover:text-black text-[#575859]"
                  />
                  <span>Issues</span>
                </a>
              </li>
              <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2  group">
                <a href="" className="flex gap-2 w-full items-center">
                  <ViewsIcon
                    name="Views"
                    width={16}
                    height={16}
                    className="group-hover:text-black text-[#575859]"
                  />
                  <span>Views</span>
                </a>
              </li>
            </ul>
            <details className="px-4 pb-5" open>
              <summary className="hover:bg-gray-300 rounded-md px-3 leading-6">Your team</summary>
              <ul className="mt-4">
                <li className="hover:bg-[#e1e1e1] hover:rounded-md group ">
                  <a href="" className="flex items-center gap-3 pl-6 h-7">
                    <IssuesIcon
                      name="Issues"
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
          <footer className="px-4 pb-5">
            <a
              href="https://github.com/otabekshoyimov/not-linear"
              className="p-1 pl-2 flex gap-2 items-center hover:bg-gray-200 rounded"
            >
              <MarkGithubIcon size="small" className="text-[#575859]" />
              Link to Github
            </a>
          </footer>
        </nav>
      </div>
    </>
  );
};
