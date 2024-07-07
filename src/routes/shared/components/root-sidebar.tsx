import { InboxSVG } from '../../../shared/components/svgs/inbox-svg';
import { IssuesSVG } from '../../../shared/components/svgs/issues';
import { NewIssueSVG } from '../../../shared/components/svgs/new-issue';
import { SearchSVG } from '../../../shared/components/svgs/search';
import { ViewsSVG } from '../../../shared/components/svgs/views';

type RootSidebarProps = {
  openDialog: () => void;
};
export const RootSidebar = ({ openDialog }: RootSidebarProps) => {
  return (
    <nav className="w-[255px] h-dvh border-0 border-r border-solid border-gray-300 text-sm ">
      <header className="flex gap-1 justify-between items-center px-4 pt-3 pb-3">
        <button className="hover:bg-[#e1e1e1]">
          <div className="p-1">
            <div className="bg-green-600 text-white rounded-md ">
              <span className="px-1 ">O</span>
            </div>
          </div>
        </button>

        <button>github</button>
      </header>
      <main className="pt-2">
        <div className="px-4">
          <button
            onClick={openDialog}
            className="hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 mb-6 w-full outline outline-1 outline-gray-300 rounded-md shadow-sm p-1 pl-2 "
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
        <ul className="flex flex-col gap-1 px-4">
          <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 outline outline-1 outline-gray-300 rounded-md group ">
            <SearchSVG
              name="Search"
              width={16}
              height={16}
              className="group-hover:text-black text-[#575859]"
            />
            Search
          </li>
          <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 group ">
            <InboxSVG
              name="Inbox"
              width={16}
              height={16}
              className="group-hover:text-black text-[#575859]"
            />
            Inbox
          </li>
          <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 group ">
            <IssuesSVG
              name="Issues"
              width={16}
              height={16}
              className="group-hover:text-black text-[#575859]"
            />
            Issues
          </li>
          <li className="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2  group">
            <ViewsSVG
              name="Views"
              width={16}
              height={16}
              className="group-hover:text-black text-[#575859]"
            />
            Views
          </li>
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
        </ul>
      </main>
    </nav>
  );
};
