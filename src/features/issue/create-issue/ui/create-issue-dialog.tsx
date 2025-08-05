import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import type { RefObject } from "react";
import { UserIcon } from "../../../../shared/ui/icons/user-icon";
import { CloseIcon } from "../../../../shared/ui/icons/close-icon";

export const CreateIssueDialog = (props: {
  dialog_ref: RefObject<HTMLDialogElement>;
  input_ref: RefObject<HTMLInputElement>;
}) => {
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
        className="animate-fadeInUp shadow-lg"
      >
        <div id="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <header className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="flex items-center rounded-sm">
                <UserIcon name="User" color="#00ae28" width={16} height={16} />
              </span>

              <span className="text-[13px] font-medium">New Issue</span>
            </div>

            <button
              onClick={close_dialog}
              className="flex justify-end hover:rounded-md hover:bg-gray-200"
            >
              <span className="rounded-md px-1 py-1 text-sm leading-none">
                <CloseIcon name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <fetcher.Form className="flex flex-col gap-2" role="form" method="post">
                <input
                  type="text"
                  name="title"
                  ref={props.input_ref}
                  placeholder="Issue title"
                  className="placeholder:text-xl placeholder:font-medium"
                />
                <input
                  type="text"
                  name="description"
                  className="font-medium"
                  placeholder="Add description..."
                />
                <input type="hidden" name="status" value="Backlog" />
                <footer>
                  <span className="flex justify-end">
                    <button
                      type="submit"
                      name="intent"
                      value="create"
                      disabled={fetcher.state === "submitting"}
                      className="rounded-md bg-green-600 px-2 py-1 text-sm text-white"
                    >
                      {fetcher.state === "submitting" ? (
                        <span className="loading-ellipsis text-[13px] font-medium">
                          Creating issue
                        </span>
                      ) : (
                        <span className="text-[13px] font-medium">Create issue</span>
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
