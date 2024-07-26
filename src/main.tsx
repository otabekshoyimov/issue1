import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  action as dialogAction,
  Index,
  loader as IssuesLoader,
} from './routes';

import { IssueDetail, loader as IssueLoader } from './routes/issue-detail';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: IssuesLoader,
        action: dialogAction,
      },
      {
        path: '/:issueId',
        element: <IssueDetail />,
        loader: IssueLoader,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
);
