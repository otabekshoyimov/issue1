import { useFetcher, useOutletContext } from "react-router-dom";
import type { OutletContext } from "../../../../pages/root";
import { useEffect, useState } from "react";
import { UserIcon } from "../../../../shared/ui/icons/user-icon";
import { CloseIcon } from "../../../../shared/ui/icons/close-icon";

export const CreateIssueDialog = () => {
  const fetcher = useFetcher();
  const outlet_context = useOutletContext<OutletContext>();
  const [is_submitting, set_is_submitting] = useState(false);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      set_is_submitting(true);
    } else if (fetcher.state === "idle") {
      set_is_submitting(false);
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.state === "idle" && !is_submitting) {
      if (outlet_context.dialogRef.current) {
        outlet_context.dialogRef.current.close();
      }
    }
  }, [fetcher.state, is_submitting, outlet_context.dialogRef]);
  
  return (
    <>
      <dialog
        id="dialog"
        ref={outlet_context.dialogRef}
        onClick={outlet_context.closeDialogOnBackdropClick}
        className="shadow-lg animate-fadeInUp"
      >
        <div id="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center  rounded-sm">
                <UserIcon name="User" color="#00ae28" width={16} height={16} />
              </span>
              New Issue
            </div>

            <button
              onClick={() => {
                if (outlet_context.dialogRef.current) {
                  outlet_context.dialogRef.current.close();
                }
              }}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1 text-sm leading-none py-1">
                <CloseIcon name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <fetcher.Form
                className="flex flex-col gap-2"
                role="form"
                method="post"
              >
                  <input type="text" name="title" placeholder="Issue title" />
                  <input
                    type="text"
                    name="description"
                    placeholder="Add description"
                  />
                  <input type="hidden" name="status" value="Backlog"/>
                <footer>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      name="intent"
                      value="create"
                      disabled={fetcher.state === "submitting"}
                      className="bg-green-600 rounded-md px-2 text-white text-sm py-1"
                    >
                      {fetcher.state === "submitting" ? (
                        <span className="loading-ellipsis">Creating</span>
                      ) : (
                        <span>Create</span>
                      )}
                    </button>
                  </span>
                </footer>
              </fetcher.Form>
            </div>
          </main>
        </div>
      </dialog>
    </>
  );
};