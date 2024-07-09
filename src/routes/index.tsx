import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useIssueContext } from './issueContext';
import { useAddIssue, useDeleteIssues, useIssues } from '../api/api';
import { OutletContext } from './root';
import { Dialog } from './shared/components/dialog';
import { Issue } from './shared/components/issue';
import { IssuesList } from './shared/components/issues-list';
import { IssuesHeader } from './shared/components/issues-header';
import { IssuesListHeader } from './shared/components/issues-list-header';
import { IssuesContainer } from './shared/components/issues-container';

export type NewIssue = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  date: string;
};
export const Index = () => {
  const issueContext = useIssueContext();
  const outletContext = useOutletContext<OutletContext>();
  const issuesAsync = useIssues();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const addIssueMn = useAddIssue();
  const deleteIssueMutation = useDeleteIssues();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!issueContext.newIssueTitle) {
      issueContext.setError('Input cannot be empty. Please try again!');
      return;
    }
    const newIssue: NewIssue = {
      id: crypto.randomUUID(),
      title: issueContext.newIssueTitle,
      description: issueContext.newIssueDescription,
      checked: false,
      date: new Date().toISOString(),
    };

    addIssueMn.mutate(newIssue, {
      onSuccess: () => {
        form.reset();
        if (outletContext.dialogRef.current) {
          outletContext.dialogRef.current.close();
        }
        issuesAsync.refetch();
      },
    });
  };

  const handleIssueSelection = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSelecetedIssue = () => {
    deleteIssueMutation.mutate(selectedIssues);
    setSelectedIssues([]);
  };
  if (!issuesAsync.data) return null;

  if (issuesAsync.isLoading) {
    return <div>loading...</div>;
  }
  if (issuesAsync.error) {
    return <div>an error occured {issuesAsync.error.message}</div>;
  }

  return (
    <>
      <Dialog handleFormSubmit={handleFormSubmit} />
      <IssuesContainer>
        <IssuesHeader
          handleSelecetedIssue={handleSelecetedIssue}
          selectedIssues={selectedIssues}
        />
        <IssuesListHeader />
        <IssuesList>
          <ul>
            {issuesAsync.data.map((issue: NewIssue) => (
              <Issue
                issue={issue}
                key={issue.id}
                selectedIssues={selectedIssues}
                handleIssueSelection={handleIssueSelection}
              />
            ))}
          </ul>
          <Outlet />
        </IssuesList>
      </IssuesContainer>
    </>
  );
};

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});
