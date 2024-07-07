import { useParams } from 'react-router-dom';
import { dateFormatter } from '../..';
import { useIssue } from '../../../api/api';

export const IssueDetail = () => {
  const { issueId } = useParams<{ issueId: string }>();
  if (!issueId) {
    return <div>Issue ID is missing.</div>;
  }
  const { data: issue, isLoading, error } = useIssue(issueId);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <section className="px-6 pt-4 bg-white leading-8 text-base mt-3">
        <header className="text-2xl font-medium pb-5">{issue.title}</header>
        <p>{issue.description}</p>
        <span className=" block">
          {dateFormatter.format(new Date(issue.date))}
        </span>
      </section>
    </>
  );
};
