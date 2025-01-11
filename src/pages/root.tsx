import { pocketbase } from "../shared/api/pocketbase";

export const root_loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");

  if (!searchParams) return null;

  const filteredResults = await pocketbase
      .collection("posts")
      .getFirstListItem(`title ~ "${searchParams}"`, {
        $cancelKey: `posts_${searchParams}`
      });

  console.log(filteredResults);
  return filteredResults;
  
};


type Post = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  description: string;
  status: string;
  title: string;
  checked: boolean;
  updated: string;
};
export type OutletContext = {
  toggleSidebar: () => void;
  setIsSidebarVisible: (value: boolean) => void;
  filteredResults: Post | null;
};
