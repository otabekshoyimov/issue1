import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TIssue } from '../routes';

const getIssues = () => {
  const issues = JSON.parse(window.localStorage.getItem('issues') || '[]');
  return Promise.resolve(issues);
};

export const useIssues = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
  });
};

const getIssueById = (id: string) => {
  const issues = JSON.parse(window.localStorage.getItem('issues') || '[]');
  const issue = issues.find((i: TIssue) => i.id.toString() === id);
  return Promise.resolve(issue);
};

export const useIssue = (id: string) => {
  return useQuery({
    queryKey: ['issue', id],
    queryFn: () => getIssueById(id),
  });
};

const updateLocalStorage = (issues: TIssue[]) => {
  window.localStorage.setItem('issues', JSON.stringify(issues));
};

export const useAddIssue = () => {
  const querClient = useQueryClient();
  return useMutation({
    mutationFn: (newIssue: TIssue) => {
      const issues = querClient.getQueryData<TIssue[]>(['issues']) || [];
      const updatedIssues = [...issues, newIssue];
      updateLocalStorage(updatedIssues);
      return Promise.resolve(updatedIssues);
    },
    onSuccess: (updatedIssues) => {
      querClient.setQueryData(['issues'], updatedIssues);
    },
  });
};

export const useDeleteIssues = () => {
  const querClient = useQueryClient();

  return useMutation({
    mutationFn: (issueIdsToDelete: string[]) => {
      const issues = querClient.getQueryData<TIssue[]>(['issues']) || [];
      const updatedIssues = issues.filter(
        (issue) => !issueIdsToDelete.includes(issue.id)
      );
      updateLocalStorage(updatedIssues);
      return Promise.resolve(updatedIssues);
    },
    onSuccess: (updatedIssues) => {
      querClient.setQueryData(['issues'], updatedIssues);
    },
  });
};
