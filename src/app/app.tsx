import { createBrowserRouter } from "react-router-dom";


import { RootLayout } from "../widgets/sidebar/ui/root-layout";
import { index_loader, root_loader } from "../pages/model/loaders";
import { IndexPage } from "../pages";
import { IssueDetail, issue_detail_loader } from "../pages/issue-detail/issue-detail";
import { root_action, index_action } from "../pages/model/actions";
import { ErrorPage } from "../pages/error/error-page";


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
