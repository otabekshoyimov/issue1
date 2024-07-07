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
        <header className="border-b border-0 border-solid border-gray-300">
          {issue.title}
        </header>
        <p className="border-b border-0 border-solid border-gray-300">
          {issue.description}
        </p>
        <span className="border-b border-0 border-solid border-gray-300 block">
          {dateFormatter.format(new Date(issue.date))}
        </span>
      </section>
    </>
  );
};
