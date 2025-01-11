import { createBrowserRouter } from "react-router-dom";
import {  root_loader } from "./root";
import { ErrorPage } from "./error/error-page";
import { IndexPage } from ".";
import { issue_detail_loader, IssueDetail } from "./issue-detail/issue-detail";
import { index_loader } from "./model/loaders";
import { index_action, root_action } from "./model/actions";
import { RootLayout } from "../widgets/sidebar/ui/root-layout";


export const router = createBrowserRouter([
  {
    path: `/`,
    element: <RootLayout />,
    loader: root_loader,
    action: root_action,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <IndexPage />,
            loader: index_loader,
            action: index_action,
          },
          {
            path: "/:issueId",
            element: <IssueDetail />,
            loader: issue_detail_loader,
          },
        ],
      },
    ],
  },
]);
