import type { ActionFunctionArgs } from "react-router-dom";
import { pocketbase } from "../../shared/api/pocketbase";
import { HTTP_STATUS } from "../../shared/constants/http-status";


export const index_action = async ({ request }: ActionFunctionArgs) => {
  const form_data = await request.formData();
  const intent = form_data.get("intent");

  const handle_create = async (form_data: FormData) => {
    const new_issue = {
      title: form_data.get("title") as string,
      description: form_data.get("description") as string,
      checked: false,
      date: new Date().toISOString(),
      status: (form_data.get("status") as string) || "Backlog",
    };

     const issue_record = await pocketbase.collection("posts").create(new_issue);
     return issue_record
    
  };

  const handle_delete = async (form_data: FormData) => {
    const selected_issue_ids = (
      form_data.get("selectedIssueIds") as string
    ).split(",");
   
    const delete_promises = selected_issue_ids.map((id) =>
      pocketbase.collection("posts").delete(id),
    );
      await Promise.all(delete_promises);
      return { status: HTTP_STATUS.OK };
    
  };

  const handle_update_status = async (form_data: FormData) => {
    const id = form_data.get("id") as string;
    const status = form_data.get("status") as string;
    const updated_issue = await pocketbase
        .collection("posts")
        .update(id, { status });
    return updated_issue;
    
  };

  if (intent === "create") {
    return await handle_create(form_data);
  }
  if (intent === "delete") {
    return await handle_delete(form_data);
  }
  if (intent === "updateStatus") {
    return await handle_update_status(form_data);
  }
}
