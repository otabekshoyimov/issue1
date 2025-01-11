import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { RootSidebar } from "./root-sidebar";

export const RootLayout = () => {
  const filteredResults = useLoaderData();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-row w-full h-full min-h-full">
        <div>
          <RootSidebar
            isNavVisible={isSidebarVisible}
          />
        </div>
        <div className="root-outlet flex-col flex-shrink-0 basis-0 min-w-0 ">
          <Outlet
            context={{
              toggleSidebar,
              setIsSidebarVisible,
              filteredResults,
            }}
          />
        </div>
      </div>
    </>
  );
};