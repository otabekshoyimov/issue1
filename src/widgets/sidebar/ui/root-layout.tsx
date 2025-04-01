import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import type { Outlet_Context } from "react-router-dom";
import { Sidebar } from "./sidebar";
import type { Issue_Item } from "../../../features/issue/issue-item/model/types";

declare module "react-router-dom" {
  export interface Outlet_Context {
    toggle_sidebar: () => void;
    filtered_results: Issue_Item | null;
  }
}

export const RootLayout = () => {
  const filtered_results = useLoaderData() as Issue_Item | null;
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(false);

  const toggle_sidebar = () => {
    set_is_sidebar_visible((prevState) => !prevState);
  };

  const outlet_context: Outlet_Context = {
    toggle_sidebar,
    filtered_results,
  };
  return (
    <>
      <div className="flex h-full min-h-full w-full flex-row">
        <div>
          <Sidebar isNavVisible={is_sidebar_visible} toggle_sidebar={toggle_sidebar} />
        </div>
        <div className="root-outlet min-w-0 flex-shrink-0 basis-0 flex-col">
          <Outlet context={outlet_context} />
        </div>
      </div>
    </>
  );
};
