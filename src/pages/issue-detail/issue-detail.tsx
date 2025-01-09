import type { Params } from "react-router-dom";
import { useLoaderData, useNavigation } from "react-router-dom";
import { pocketbase } from "../../shared/api/pocketbase";
import { Spinner } from "../../shared/ui/spinner";
import { IssuesHeader } from "../../features/issue/issues-list/ui/issues-header";
import { format_date } from "../../shared/utils/date/format-date";

export async function issue_detail_loader({ params }: { params: Params }) {
  console.log("Params:", params, typeof params.issueId);
  if (!params.issueId) {
    throw new Error("issue id is required");
  }
  const issue = await pocketbase.collection("posts").getOne(params.issueId);
  console.log("Fetched Issue:", issue);
  return issue;
}

export const IssueDetail = () => {
  const issue = useLoaderData() as any;
  console.log(issue);
  const navigation = useNavigation();
  if (navigation.state === "loading") {
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
        <span className=" block">{format_date(issue.date)}</span>
      </section>
    </>
  );
};
