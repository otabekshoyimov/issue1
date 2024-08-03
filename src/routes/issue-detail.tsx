import type { Params } from 'react-router-dom';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { pocketbase } from '../pocketbase';
import { dateFormatter } from '../utils/utils';

export async function loader({ params }: { params: Params }) {
  console.log('Params:', params, typeof params.issueId);
  if (!params.issueId) {
    throw new Error('issue id is required');
  }
  const issue = await pocketbase.collection('posts').getOne(params.issueId, {
    expand: 'relField1,relField2.subRelField',
  });
  // const issue = await getIssueByIdAsync(params.issueId);
  console.log('Fetched Issue:', issue);
  return issue;
}

export const IssueDetail = () => {
  const issue = useLoaderData() as any;
  console.log(issue);
  const navigation = useNavigation();
  if (navigation.state === 'loading') {
    return <div>loading...</div>;
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
