import { useFetcher, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../routes/root';
import { CloseSVG } from './svgs/close-button';
import { UserSVG } from './svgs/user-svg';

export const Dialog = () => {
  const fetcher = useFetcher();
  const outletContext = useOutletContext<OutletContext>();
  if (fetcher.state === 'submitting' && outletContext.dialogRef.current) {
    outletContext.dialogRef.current.close();
    outletContext.setIsSidebarVisible(false);
  }
  return (
    <>
      <dialog
        id="dialog"
        ref={outletContext.dialogRef}
        onClick={outletContext.closeDialogOnBackdropClick}
        className="shadow-lg animate-fadeInUp"
      >
        <div id="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              New Issue
            </div>

            <button
              onClick={() => {
                if (outletContext.dialogRef.current) {
                  outletContext.dialogRef.current.close();
                }
              }}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <fetcher.Form
                className="flex flex-col gap-2"
                role="form"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetcher.submit(e.currentTarget);
                  e.currentTarget.reset();
                }}
              >
                <label htmlFor="" className="font-semibold">
                  <input type="text" name="title" placeholder="Issue title" />
                </label>
                <label htmlFor="">
                  <input
                    type="text"
                    name="description"
                    placeholder="Add description"
                  />
                </label>
                <label htmlFor="">
                  <input type="hidden" name="status" value="Backlog" />
                </label>
                <footer>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      className="bg-green-600 rounded-md px-2 text-white text-sm py-1"
                    >
                      Create Issue
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
