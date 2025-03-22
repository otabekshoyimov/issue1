import { Link, useNavigation, useOutletContext } from "react-router-dom";
import type { Outlet_Context } from "react-router-dom";
import type { ReactNode } from "react";
import { OpenNavIcon } from "../../../../shared/ui/icons/open-nav-icon";
import { Spinner } from "../../../../shared/ui/spinner";

export const IssuesHeader = (props: { children?: ReactNode }) => {
  const navigation = useNavigation();
  const outlet_context = useOutletContext<Outlet_Context>();

  return (
    <>
      <section className=" flex px-4 h-9 justify-between items-center text-sm border-0 border-b border-solid border-gray-300 bg-white">
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={() => {
              outlet_context.toggle_sidebar();
            }}
            className="flex items-center hover:bg-gray-300 p-1 rounded-md nav-btn z-[97] relative lg:hidden"
          >
            <OpenNavIcon name="OpenNav" width={20} height={20} />
          </button>
          <Link
            to="/"
            className="hover:bg-gray-200 px-2 p-1 rounded text-[13px] font-medium text-gray-700"
          >
            All issues
          </Link>
          {navigation.state === "loading" && <Spinner />}
        </div>
        {props.children}
      </section>
    </>
  );
};
