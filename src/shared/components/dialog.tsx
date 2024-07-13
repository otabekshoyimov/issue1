import { useOutletContext } from 'react-router-dom';

import { useRef } from 'react';
import { useIssueContext } from '../../routes/issueContext';
import { OutletContext } from '../../routes/root';
import { UserSVG } from './svgs/user-svg';
import { CloseSVG } from './svgs/close-button';

type DialogProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Dialog = (props: DialogProps) => {
  const issueContext = useIssueContext();
  const outletContext = useOutletContext<OutletContext>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseButtonClick = () => {
    if (outletContext.dialogRef.current) {
      outletContext.dialogRef.current.close();
    }
  };

  return (
    <>
      <dialog
        id="dialog"
        ref={outletContext.dialogRef}
        onClick={outletContext.handleDialogClick}
        className="shadow-lg"
      >
        <div
          id="dialog-inner"
          ref={outletContext.dialogInnerRef}
          onClick={outletContext.dialogInnerStopPropagation}
        >
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              New Issue
              {issueContext.error && (
                <div className="text-red-500 text-sm">{issueContext.error}</div>
              )}
            </div>

            <button
              onClick={handleCloseButtonClick}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <form
                className="flex flex-col gap-2"
                onSubmit={props.handleFormSubmit}
                ref={formRef}
              >
                <label htmlFor="" className="font-semibold">
                  <input
                    type="text"
                    placeholder="Issue title"
                    onChange={(e) =>
                      issueContext.setNewIssueTitle(e.target.value)
                    }
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Add description"
                    onChange={(e) =>
                      issueContext.setNewIssueDescription(e.target.value)
                    }
                  />
                </label>
                <footer>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      className="bg-purple-400 rounded-md px-2 text-white text-sm py-1"
                    >
                      Create Issue
                    </button>
                  </span>
                  {/* <div>{JSON.stringify(newIssueTitle)}</div> */}
                  {/* <div>{JSON.stringify(newIssueDescription)}</div> */}
                  {/* <div>{JSON.stringify(issues)}</div> */}
                </footer>
              </form>
            </div>
          </main>
        </div>
      </dialog>
    </>
  );
};
