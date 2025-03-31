import { type ReactNode } from "react";

export const SidebarNavlinkListItem = (props: { children: ReactNode }) => {
  return (
    <li className="group items-center hover:rounded-md hover:bg-[#e8e8e8]">{props.children}</li>
  );
};
