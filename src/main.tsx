import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { action as indexAction, Index, loader as indexLoader } from './routes';

import { IssueDetail, loader as issueLoader } from './routes/issue-detail';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
        action: indexAction,
      },
      {
        path: '/:issueId',
        element: <IssueDetail />,
        loader: issueLoader,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
);
