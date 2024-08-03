export const createNewIssueAsync = async (newIssue: any) => {
  const issues = JSON.parse(window.localStorage.getItem('issues') || '[]');
  const newIssues = [...issues, newIssue];
  window.localStorage.setItem('issues', JSON.stringify(newIssues));
  return newIssues;
};
export const getIssueByIdAsync = async (id: string) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const issue = issues.find((i: any) => i.id.toString() === id);
  return issue;
};

export const deleteIssuesAsync = async (issueIdsToDelete: string[]) => {
  const issues = await JSON.parse(
    window.localStorage.getItem('issues') || '[]'
  );
  const updatedIssues = issues.filter(
    (issue: any) => !issueIdsToDelete.includes(issue.id)
  );
  window.localStorage.setItem('issues', JSON.stringify(updatedIssues));
  return updatedIssues;
};
