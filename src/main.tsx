import ReactDOM from 'react-dom/client';

import { Root } from './routes/root';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Index } from './routes';
import { IssueProvider } from './routes/issueContext';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <IssueProvider>
    <RouterProvider router={router}></RouterProvider>
  </IssueProvider>
);
