import { NewIssue } from '../routes';

export const getIssueById = async (id: string) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const issue = issues.find((i: NewIssue) => i.id.toString() === id);
  return issue;
};

export const deleteIssues = async (issueIdsToDelete: string[]) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const updatedIssues = issues.filter(
    (issue: NewIssue) => !issueIdsToDelete.includes(issue.id)
  );
  window.localStorage.setItem('issues', JSON.stringify(updatedIssues));
  return updatedIssues;
};
