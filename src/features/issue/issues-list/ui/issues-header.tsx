import type { ReactNode } from "react";
import type { Outlet_Context } from "react-router-dom";
import { Link, useOutletContext } from "react-router-dom";
import { OpenNavIcon } from "../../../../shared/ui/icons/open-nav-icon";

export const IssuesHeader = (props: { children?: ReactNode }) => {
  const outlet_context = useOutletContext<Outlet_Context>();

  return (
    <>
      <section className="flex h-9 items-center justify-between border-0 border-b border-solid border-gray-300 bg-white px-4 text-sm">
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              outlet_context.toggle_sidebar();
            }}
            className="nav-btn relative z-[97] flex items-center rounded-md p-1 hover:bg-gray-300 lg:hidden"
          >
            <OpenNavIcon name="OpenNav" width={20} height={20} />
          </button>
          <Link
            to="/"
            className="rounded p-1 px-2 text-[13px] font-medium text-gray-700 hover:bg-gray-200"
          >
            All issues
          </Link>
        </div>
        {props.children}
      </section>
    </>
  );
};
