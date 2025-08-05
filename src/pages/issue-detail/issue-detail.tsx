import type { Params } from "react-router-dom";
import { useLoaderData, useNavigation } from "react-router-dom";
import { IssuesHeader } from "../../features/issue/issues-list/ui/issues-header";
import { pocketbase } from "../../shared/api/pocketbase";
import { Spinner } from "../../shared/ui/spinner";
import { format_date } from "../../shared/utils/date/format-date";

export async function issue_detail_loader({ params }: { params: Params }) {
  if (!params.issueId) {
    throw new Error("issue id is required");
  }
  const issue = await pocketbase.collection("posts").getOne(params.issueId);
  return issue;
}

export const IssueDetail = () => {
  const issue = useLoaderData() as any;
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
      <section className="mt-3 bg-white px-6 pt-4 text-base leading-8">
        <header className="pb-5 text-2xl font-medium">{issue.title}</header>
        <p>{issue.description}</p>

        <span className="block text-[13px]">{format_date(issue.date)}</span>
      </section>
    </>
  );
};
