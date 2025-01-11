import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import type {RefObject} from 'react'
import { UserIcon } from "../../../../shared/ui/icons/user-icon";
import { CloseIcon } from "../../../../shared/ui/icons/close-icon";

export const CreateIssueDialog = (props: { dialog_ref: RefObject<HTMLDialogElement> }) => {
  const fetcher = useFetcher();

  const close_dialog = () => {
    if (props.dialog_ref.current) {
      props.dialog_ref.current.close();
    }
  };
  const close_on_backdrop = (e: React.MouseEvent) => {
    if (e.target === props.dialog_ref.current) {
      props.dialog_ref.current?.close();
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      props.dialog_ref.current?.close();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <dialog
        id="dialog"
        ref={props.dialog_ref}
        onClick={close_on_backdrop}
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
              onClick={close_dialog}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1 text-sm leading-none py-1">
                <CloseIcon name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <fetcher.Form className="flex flex-col gap-2" role="form" method="post">
                <input type="text" name="title" placeholder="Issue title" />
                <input type="text" name="description" placeholder="Add description" />
                <input type="hidden" name="status" value="Backlog" />
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
