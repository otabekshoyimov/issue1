import type { Params } from 'react-router-dom';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { pocketbase } from '../pocketbase';
import { formatDate } from '../utils/utils';
import { Spinner } from '../shared/components/spinner';
import { IssuesHeader } from '.';

export async function loader({ params }: { params: Params }) {
  console.log('Params:', params, typeof params.issueId);
  if (!params.issueId) {
    throw new Error('issue id is required');
  }
  const issue = await pocketbase.collection('posts').getOne(params.issueId);
  // const issue = await getIssueByIdAsync(params.issueId);
  console.log('Fetched Issue:', issue);
  return issue;
}

export const IssueDetail = () => {
  const issue = useLoaderData() as any;
  console.log(issue);
  const navigation = useNavigation();
  if (navigation.state === 'loading') {
    return (
      <div className="p-3">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <IssuesHeader />
      <section className="px-6 pt-4 bg-white leading-8 text-base mt-3">
        <header className="text-2xl font-medium pb-5">{issue.title}</header>
        <p>{issue.description}</p>
        <span className=" block">{formatDate(issue.date)}</span>
      </section>
    </>
  );
};
