import { pocketbase } from "../../shared/api/pocketbase";

export const root_loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const search_params = url.searchParams.get("search");

  if (!search_params) return null;

  const filtered_results = await pocketbase
      .collection("posts")
      .getFirstListItem(`title ~ "${search_params}"`, {
        $cancelKey: `posts_${search_params}`
      });

  return filtered_results;
  
};


export const index_loader = async () => {
  const issues = await pocketbase.collection("posts").getFullList();
  return issues;
};