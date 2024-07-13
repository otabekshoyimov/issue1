import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Index } from './routes';
import { IssueProvider } from './routes/issueContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IssueDetail } from './routes/issue-detail';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/:issueId',
        element: <IssueDetail />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <IssueProvider>
      <RouterProvider router={router}></RouterProvider>
    </IssueProvider>
  </QueryClientProvider>
);
