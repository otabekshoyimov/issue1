import { pocketbase } from "../../shared/api/pocketbase";

export const index_loader = async () => {
  const issues = await pocketbase.collection("posts").getFullList();
  return issues;
};