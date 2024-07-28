import { NewIssue } from '../routes';

export const createNewIssueAsync = async (newIssue: NewIssue) => {
  const issues = JSON.parse(window.localStorage.getItem('issues') || '[]');
  const newIssues = [...issues, newIssue];
  window.localStorage.setItem('issues', JSON.stringify(newIssues));
  return newIssues;
};
export const getIssueByIdAsync = async (id: string) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const issue = issues.find((i: NewIssue) => i.id.toString() === id);
  return issue;
};

export const deleteIssuesAsync = async (issueIdsToDelete: string[]) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const updatedIssues = issues.filter(
    (issue: NewIssue) => !issueIdsToDelete.includes(issue.id)
  );
  window.localStorage.setItem('issues', JSON.stringify(updatedIssues));
  return updatedIssues;
};
