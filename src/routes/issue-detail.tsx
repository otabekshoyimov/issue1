import { useParams } from 'react-router-dom';
import { dateFormatter } from '.';
import { useIssue } from '../api/api';

export const IssueDetail = () => {
  const params = useParams<{ issueId: string }>();
  if (!params.issueId) {
    return <div>Issue ID is missing.</div>;
  }
  const issueAsync = useIssue(params.issueId);

  if (issueAsync.isLoading) {
    return <div>loading...</div>;
  }
  if (issueAsync.error) {
    return <div>{issueAsync.error.message}</div>;
  }

  return (
    <>
      <section className="px-6 pt-4 bg-white leading-8 text-base mt-3">
        <header className="text-2xl font-medium pb-5">
          {issueAsync.data.title}
        </header>
        <p>{issueAsync.data.description}</p>
        <span className=" block">
          {dateFormatter.format(new Date(issueAsync.data.date))}
        </span>
      </section>
    </>
  );
};
