import { useState } from "react";
import { Outlet, useLoaderData} from "react-router-dom";
import type { Outlet_Context } from "react-router-dom";
import { RootSidebar } from "./root-sidebar";
import type { Issue_Item } from "../../../pages/root";

declare module 'react-router-dom' {
  export interface Outlet_Context  {
    toggle_sidebar: () => void;
    filtered_results: Issue_Item | null;
  }
}

export const RootLayout = () => {
  const filtered_results = useLoaderData() as Issue_Item | null;
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(false);
  
  const outlet_context: Outlet_Context = {
    toggle_sidebar: () => {
      set_is_sidebar_visible((prevState) => !prevState);
    },
    filtered_results
  };
  return (
    <>
      <div className="flex flex-row w-full h-full min-h-full">
        <div>
          <RootSidebar
            isNavVisible={is_sidebar_visible}
          />
        </div>
        <div className="root-outlet flex-col flex-shrink-0 basis-0 min-w-0 ">
          <Outlet
            context={outlet_context}
          />
        </div>
      </div>
    </>
  );
};