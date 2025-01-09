import { createBrowserRouter } from "react-router-dom";
import { Root, rootLoader } from "./root";
import { ErrorPage } from "./error/error-page";
import { index_action, index_loader, IndexPage } from ".";
import { issue_detail_loader, IssueDetail } from "./issue-detail/issue-detail";

export const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    loader: rootLoader,
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
