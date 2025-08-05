import { useState } from "react";
import type { Outlet_Context } from "react-router-dom";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import { DeleteIssueButton } from "../features/issue/delete-issue/delete-issue-button";
import { ISSUE_STATUSES } from "../features/issue/issue-item/model/constants";
import type { Issue_Item } from "../features/issue/issue-item/model/types";
import { IssueItem } from "../features/issue/issue-item/ui/issue-item";
import { IssuesContainer } from "../features/issue/issues-list/ui/issues-container";
import { IssuesHeader } from "../features/issue/issues-list/ui/issues-header";
import { IssuesList } from "../features/issue/issues-list/ui/issues-list";

export const IndexPage = () => {
  const issues_async = useLoaderData() as Issue_Item[];

  const outlet_context = useOutletContext<Outlet_Context>();
  const [selected_issues, set_selected_issues] = useState<string[]>([]);

  const handle_issue_select = (issueId: string) => {
    set_selected_issues((prev) =>
      prev.includes(issueId) ? prev.filter((id) => id !== issueId) : [...prev, issueId],
    );
  };

  const clear_selected_issues = () => {
    set_selected_issues([]);
  };

  const grouped_issues: Record<string, Issue_Item[]> = {};
  for (const status of ISSUE_STATUSES) {
    grouped_issues[status.key] = issues_async.filter((issue) => {
      return issue.status === status.key;
    });
  }
  return (
    <>
      <IssuesContainer>
        <IssuesHeader>
          <DeleteIssueButton
            selectedIssues={selected_issues}
            clear_selected_issues={clear_selected_issues}
          />
        </IssuesHeader>

        <IssuesList>
          {outlet_context.search_results ? (
            <IssueItem
              issue={outlet_context.search_results}
              selectedIssues={selected_issues}
              onIssueSelect={handle_issue_select}
            />
          ) : (
            <>
              {ISSUE_STATUSES.map((status) => (
                <div key={status.key}>
                  <div className="flex items-center gap-2 border-0 border-b border-solid border-gray-300 bg-[#f6f6f6] px-5 py-2 text-sm">
                    <span className="text-[13px] font-medium text-gray-700">{status.icon}</span>
                    <span className="text-[13px] font-medium">{status.label}</span>
                  </div>

                  <ul>
                    {grouped_issues[status.key].length > 0
                      ? grouped_issues[status.key].map((issue) => (
                          <IssueItem
                            key={issue.id}
                            issue={issue}
                            selectedIssues={selected_issues}
                            onIssueSelect={handle_issue_select}
                          />
                        ))
                      : null}
                  </ul>
                </div>
              ))}
            </>
          )}
          <Outlet />
        </IssuesList>
      </IssuesContainer>
    </>
  );
};
