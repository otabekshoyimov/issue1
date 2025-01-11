import {
  useState,
} from "react";

import {
  Outlet,
  useLoaderData,
  useOutletContext
} from "react-router-dom";
import type { Outlet_Context } from "react-router-dom";

import { DeleteIssueButton } from "../features/issue/delete-issue/delete-issue-button";
import type { Issue_Item } from "../features/issue/issue-item/model/types";
import { IssueItem } from "../features/issue/issue-item/ui/issue-item";
import { IssuesContainer } from "../features/issue/issues-list/ui/issues-container";
import { IssuesHeader } from "../features/issue/issues-list/ui/issues-header";
import { IssuesList } from "../features/issue/issues-list/ui/issues-list";
import { IssuesListHeader } from "../features/issue/issues-list/ui/issues-list-header";

export const IndexPage = () => {
  const issues_async = useLoaderData() as Issue_Item[];
  const outlet_context = useOutletContext<Outlet_Context>();
  const [selected_issues, set_selected_issues] = useState<string[]>([]);

  const handle_issue_selection = (issueId: string) => {
    set_selected_issues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId],
    );
  };
  return (
    <>
      <IssuesContainer>
        <IssuesHeader>
          <DeleteIssueButton selectedIssues={selected_issues} />
        </IssuesHeader>
        <IssuesListHeader/>
        <IssuesList>
          {outlet_context.filtered_results ? (
            <IssueItem
              issue={outlet_context.filtered_results}
              key={outlet_context.filtered_results.id}
              selectedIssue={selected_issues}
              onIssueSelect={handle_issue_selection}
            />
          ) : (
            <ul>
              {issues_async.map((issue: Issue_Item) => (
                <IssueItem
                  issue={issue}
                  key={issue.id}
                  selectedIssue={selected_issues}
                  onIssueSelect={handle_issue_selection}
                />
              ))}
            </ul>
          )}
          <Outlet />
        </IssuesList>
      </IssuesContainer>
    </>
  );
};