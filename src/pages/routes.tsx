import { createBrowserRouter } from "react-router-dom";
import { Root, root_loader } from "./root";
import { ErrorPage } from "./error/error-page";
import { IndexPage } from ".";
import { issue_detail_loader, IssueDetail } from "./issue-detail/issue-detail";
import { index_loader } from "./model/loaders";
import { index_action } from "./model/actions";


export const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    loader: root_loader,
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
